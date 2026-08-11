import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, MessageCircle, Instagram } from 'lucide-react'

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
    <>
    <header className="pub-navbar">
      {/* Fila 1: logo centrado con hamburguesa en mobile */}
      <div className="pub-navbar__top">
        <div className="pub-navbar__side" />
        <Link to="/" className="pub-navbar__brand" onClick={close}>
          <img
            className="pub-navbar__logo"
            src="/logo.png"
            alt="Dálida Beauty & Spa"
            onClick={openLogo}
            title="Ver logo"
          />
          <span className="pub-navbar__brand-name">Dálida Beauty &amp; Spa</span>
        </Link>
        <div className="pub-navbar__side pub-navbar__side--right">
          <button
            className="pub-navbar__toggle"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menú"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Fila 2: menú horizontal + botones Reservar / Instagram */}
      <nav className={`pub-navbar__nav ${open ? 'pub-navbar__nav--open' : ''}`}>
        <ul className="pub-navbar__menu">
          <li><NavLink to="/" end onClick={close}>Inicio</NavLink></li>
          <li><NavLink to="/servicios" onClick={close}>Servicios</NavLink></li>
          <li><NavLink to="/promociones" onClick={close}>Promociones</NavLink></li>
          <li><NavLink to="/galeria" onClick={close}>Galería</NavLink></li>
          <li>
            <a
              href="https://wa.me/595982137690"
              target="_blank"
              rel="noopener"
              className="pub-navbar__cta"
              onClick={close}
            >
              <MessageCircle size={18} strokeWidth={2} />
              <span>Reservar</span>
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener"
              className="pub-navbar__cta pub-navbar__cta--alt"
              onClick={close}
            >
              <Instagram size={18} strokeWidth={2} />
              <span>Instagram</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>

    {showLogo && (
      <div className="lightbox" onClick={() => setShowLogo(false)}>
        <button className="lightbox__close" aria-label="Cerrar" onClick={() => setShowLogo(false)}>
          <X size={24} />
        </button>
        <img
          className="lightbox__logo"
          src="/logo.png"
          alt="Dálida Beauty & Spa"
        />
      </div>
    )}
    </>
  )
}
