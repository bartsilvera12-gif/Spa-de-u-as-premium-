import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function PublicNavbar() {
  const [open, setOpen] = useState(false)
  const [showLogo, setShowLogo] = useState(false)
  const close = () => setOpen(false)

  const openLogo = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowLogo(true)
  }

  useEffect(() => {
    if (!showLogo) return
    const onKey = (e) => { if (e.key === 'Escape') setShowLogo(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showLogo])

  return (
    <nav className="pub-navbar">
      <div className="pub-navbar__inner">
        <Link to="/" className="pub-navbar__brand" onClick={close}>
          <img
            className="pub-navbar__logo"
            src="/logo.png"
            alt="Spa de Uñas Premium"
            onClick={openLogo}
            title="Ver logo"
          />
          <span>Spa de Uñas</span>
        </Link>
        <ul className={`pub-navbar__menu ${open ? 'pub-navbar__menu--open' : ''}`}>
          <li><NavLink to="/" end onClick={close}>Inicio</NavLink></li>
          <li><NavLink to="/servicios" onClick={close}>Servicios</NavLink></li>
          <li><NavLink to="/promociones" onClick={close}>Promociones</NavLink></li>
          <li><NavLink to="/galeria" onClick={close}>Galería</NavLink></li>
          <li><a href="https://wa.me/595982137690" target="_blank" rel="noopener">Reservar</a></li>
        </ul>
        <button className="pub-navbar__toggle" onClick={() => setOpen((o) => !o)} aria-label="Menú">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {showLogo && (
        <div className="lightbox" onClick={() => setShowLogo(false)}>
          <button className="lightbox__close" aria-label="Cerrar" onClick={() => setShowLogo(false)}>
            <X size={24} />
          </button>
          <img
            className="lightbox__logo"
            src="/logo.png"
            alt="Spa de Uñas Premium"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </nav>
  )
}
