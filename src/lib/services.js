import { supabase } from './supabase.js'
import { fallbackCategorias, fallbackServicios } from '../data/fallbackData.js'

const TTL_MS = 5 * 60 * 1000
const TIMEOUT_MS = 6000

const cache = new Map()      // key -> { data, expires }
const inflight = new Map()   // key -> Promise

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), ms)
    promise.then(
      (v) => { clearTimeout(t); resolve(v) },
      (e) => { clearTimeout(t); reject(e) }
    )
  })
}

async function cached(key, fetcher, fallback) {
  const hit = cache.get(key)
  if (hit && hit.expires > Date.now()) return hit.data
  if (inflight.has(key)) return inflight.get(key)

  const p = (async () => {
    try {
      const data = await withTimeout(fetcher(), TIMEOUT_MS)
      const value = data && data.length ? data : fallback
      cache.set(key, { data: value, expires: Date.now() + TTL_MS })
      return value
    } catch (e) {
      console.warn(`[services] fallback ${key}:`, e.message)
      // Cachear también el fallback un ratito para no reintentar en cada nav.
      cache.set(key, { data: fallback, expires: Date.now() + 30_000 })
      return fallback
    } finally {
      inflight.delete(key)
    }
  })()
  inflight.set(key, p)
  return p
}

export function invalidateCache() {
  cache.clear()
  inflight.clear()
}

export async function getCategorias({ soloActivas = true } = {}) {
  const key = `categorias:${soloActivas}`
  return cached(key, async () => {
    let q = supabase.from('categorias').select('*').order('orden', { ascending: true })
    if (soloActivas) q = q.eq('activo', true)
    const { data, error } = await q
    if (error) throw error
    return data
  }, fallbackCategorias)
}

export async function getServicios({ soloActivos = true, categoriaId = null } = {}) {
  const key = `servicios:${soloActivos}:${categoriaId || 'all'}`
  return cached(key, async () => {
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
