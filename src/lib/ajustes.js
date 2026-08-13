import { useState, useEffect } from 'react'
import { supabase } from './supabase.js'

// Valores por defecto (se usan si la tabla `ajustes` todavía no existe o no responde).
// Instagram vacío = el link no se muestra en la web.
export const DEFAULT_AJUSTES = {
  whatsapp: '595982137690',
  instagram_url: '',
  facebook_url: '',
  tiktok_url: '',
  email: '',
  direccion: 'Asunción, Paraguay',
}

// Dedup: si varios componentes piden los ajustes a la vez (navbar, footer,
// botón flotante) comparten una sola consulta.
let inflight = null
export async function getAjustes() {
  if (inflight) return inflight
  inflight = (async () => {
    try {
      const { data, error } = await supabase.from('ajustes').select('*').eq('id', 1).maybeSingle()
      if (error || !data) return DEFAULT_AJUSTES
      return { ...DEFAULT_AJUSTES, ...data }
    } catch {
      return DEFAULT_AJUSTES
    }
  })()
  try {
    return await inflight
  } finally {
    inflight = null
  }
}

export async function saveAjustes(values) {
  const payload = {
    id: 1,
    whatsapp: (values.whatsapp || '').trim() || null,
    instagram_url: (values.instagram_url || '').trim() || null,
    facebook_url: (values.facebook_url || '').trim() || null,
    tiktok_url: (values.tiktok_url || '').trim() || null,
    email: (values.email || '').trim() || null,
    direccion: (values.direccion || '').trim() || null,
    updated_at: new Date().toISOString(),
  }
  return supabase.from('ajustes').upsert(payload, { onConflict: 'id' })
}

// Hook para la web pública: lee los ajustes al montar (con fallback inmediato).
export function useAjustes() {
  const [ajustes, setAjustes] = useState(DEFAULT_AJUSTES)
  useEffect(() => {
    let alive = true
    getAjustes().then((a) => { if (alive) setAjustes(a) })
    return () => { alive = false }
  }, [])
  return ajustes
}
