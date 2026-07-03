import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Sincroniza en varios frames para vencer restauracion automatica del scroll.
    const doScroll = () => {
      window.scrollTo(0, 0)
      if (document.documentElement) document.documentElement.scrollTop = 0
      if (document.body) document.body.scrollTop = 0
    }
    doScroll()
    requestAnimationFrame(doScroll)
    const t = setTimeout(doScroll, 0)
    return () => clearTimeout(t)
  }, [pathname])

  useEffect(() => {
    // Evita que el navegador restaure la posicion previa al navegar.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  return null
}
