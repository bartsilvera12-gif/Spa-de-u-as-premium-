import { supabase } from './supabase.js'
import { fallbackCategorias, fallbackServicios } from '../data/fallbackData.js'

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

export async function getServiciosPorCategoria() {
  const [cats, servs] = await Promise.all([getCategorias(), getServicios()])
  return cats.map((c) => ({
    ...c,
    servicios: servs.filter((s) => (s.categoria_id || s.categoria?.id) === c.id),
  }))
}
