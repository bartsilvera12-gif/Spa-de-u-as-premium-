import { supabase } from './supabase.js'
import { fallbackCategorias, fallbackServicios } from '../data/fallbackData.js'
import { catalogo as fallbackCatalogo } from '../data/catalogo.js'

const TIMEOUT_MS = 6000

// Solo deduplicación de requests en vuelo (dos componentes que piden lo mismo
// en el mismo render comparten la promesa). NO cachea entre navegaciones.
const inflight = new Map()

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), ms)
    promise.then(
      (v) => { clearTimeout(t); resolve(v) },
      (e) => { clearTimeout(t); reject(e) }
    )
  })
}

async function fetchLive(key, fetcher, fallback) {
  if (inflight.has(key)) return inflight.get(key)
  const p = (async () => {
    try {
      const data = await withTimeout(fetcher(), TIMEOUT_MS)
      return data && data.length ? data : fallback
    } catch (e) {
      console.warn(`[services] fallback ${key}:`, e.message)
      return fallback
    } finally {
      inflight.delete(key)
    }
  })()
  inflight.set(key, p)
  return p
}

// Ya no cachea, pero se mantiene la API por compatibilidad con AdminCategorias/AdminServicios.
export function invalidateCache() {
  inflight.clear()
}

export async function getCategorias({ soloActivas = true } = {}) {
  return fetchLive(`categorias:${soloActivas}`, async () => {
    let q = supabase.from('categorias').select('*').order('orden', { ascending: true })
    if (soloActivas) q = q.eq('activo', true)
    const { data, error } = await q
    if (error) throw error
    return data
  }, fallbackCategorias)
}

export async function getServicios({ soloActivos = true, categoriaId = null } = {}) {
  return fetchLive(`servicios:${soloActivos}:${categoriaId || 'all'}`, async () => {
    let q = supabase
      .from('servicios')
      .select('*, categoria:categorias(*)')
      .order('orden', { ascending: true })
    if (soloActivos) q = q.eq('activo', true)
    if (categoriaId) q = q.eq('categoria_id', categoriaId)
    const { data, error } = await q
    if (error) throw error
    return data
  }, fallbackServicios)
}

// Catálogo integral (áreas -> grupos -> servicios) reconstruido desde Supabase.
// Las áreas del catálogo se distinguen por tener `icono`. Si Supabase no responde
// o todavía no se corrió la migración, cae al catálogo estático de catalogo.js.
export async function getCatalogo() {
  return fetchLive('catalogo', async () => {
    const [cRes, sRes] = await Promise.all([
      supabase.from('categorias').select('*').eq('activo', true).order('orden', { ascending: true }),
      supabase.from('servicios').select('*').eq('activo', true).order('orden', { ascending: true }),
    ])
    if (cRes.error) throw cRes.error
    if (sRes.error) throw sRes.error

    const byCat = {}
    for (const s of sRes.data || []) (byCat[s.categoria_id] ||= []).push(s)

    // Se muestran todas las categorías activas que tengan servicios, excepto
    // "promociones" (que alimenta su propia sección). El ícono es opcional:
    // si no tiene, se usa uno por defecto.
    const areas = (cRes.data || []).filter((c) => c.slug !== 'promociones' && (byCat[c.id] || []).length)
    if (!areas.length) throw new Error('catálogo vacío')

    return areas.map((a) => {
      const list = (byCat[a.id] || []).slice().sort((x, y) => (x.orden || 0) - (y.orden || 0))
      const grupos = []
      const idx = {}
      for (const s of list) {
        const key = s.grupo || ''
        if (!(key in idx)) { idx[key] = grupos.length; grupos.push({ titulo: s.grupo || undefined, servicios: [] }) }
        grupos[idx[key]].servicios.push({ nombre: s.nombre, img: s.imagen_url || null })
      }
      return { id: a.slug, nombre: a.nombre, icono: a.icono || '✨', descripcion: a.descripcion, grupos }
    })
  }, fallbackCatalogo)
}

export async function getServiciosPorCategoria() {
  const [cats, servs] = await Promise.all([getCategorias(), getServicios()])
  return cats.map((c) => ({
    ...c,
    servicios: servs.filter((s) => (s.categoria_id || s.categoria?.id) === c.id),
  }))
}
