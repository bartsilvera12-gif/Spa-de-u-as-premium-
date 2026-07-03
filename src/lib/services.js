import { supabase } from './supabase.js'
import { fallbackCategorias, fallbackServicios } from '../data/fallbackData.js'

export async function getCategorias({ soloActivas = true } = {}) {
  try {
    let q = supabase.from('categorias').select('*').order('orden', { ascending: true })
    if (soloActivas) q = q.eq('activo', true)
    const { data, error } = await q
    if (error) throw error
    return data && data.length ? data : fallbackCategorias
  } catch (e) {
    console.warn('[services] fallback categorias:', e.message)
    return fallbackCategorias
  }
}

export async function getServicios({ soloActivos = true, categoriaId = null } = {}) {
  try {
    let q = supabase
      .from('servicios')
      .select('*, categoria:categorias(*)')
      .order('orden', { ascending: true })
    if (soloActivos) q = q.eq('activo', true)
    if (categoriaId) q = q.eq('categoria_id', categoriaId)
    const { data, error } = await q
    if (error) throw error
    return data && data.length ? data : fallbackServicios
  } catch (e) {
    console.warn('[services] fallback servicios:', e.message)
    return fallbackServicios
  }
}

export async function getServiciosPorCategoria() {
  const [cats, servs] = await Promise.all([getCategorias(), getServicios()])
  return cats.map((c) => ({
    ...c,
    servicios: servs.filter((s) => (s.categoria_id || s.categoria?.id) === c.id),
  }))
}
