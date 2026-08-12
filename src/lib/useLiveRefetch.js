import { useEffect, useRef } from 'react'

// Vuelve a ejecutar `fn` cuando la pestaña recupera foco/visibilidad.
// Sirve para reflejar "en vivo" los cambios hechos desde el admin en la web
// pública sin necesidad de recargar manualmente.
export function useLiveRefetch(fn) {
  const ref = useRef(fn)
  ref.current = fn
  useEffect(() => {
    const handler = () => {
      if (document.visibilityState === 'visible') ref.current()
    }
    window.addEventListener('focus', handler)
    document.addEventListener('visibilitychange', handler)
    return () => {
      window.removeEventListener('focus', handler)
      document.removeEventListener('visibilitychange', handler)
    }
  }, [])
}
