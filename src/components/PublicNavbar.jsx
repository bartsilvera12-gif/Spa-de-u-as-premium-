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
      {/* Fila 1: logo centrado + iconos a la derecha */}
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
          <a
            href="https://wa.me/595982137690"
            target="_blank"
            rel="noopener"
            className="pub-navbar__icon"
            aria-label="WhatsApp"
            title="WhatsApp"
          >
            <MessageCircle size={20} strokeWidth={1.7} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener"
            className="pub-navbar__icon"
            aria-label="Instagram"
            title="Instagram"
          >
            <Instagram size={20} strokeWidth={1.7} />
          </a>
          <button
            className="pub-navbar__toggle"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menú"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Fila 2: menú horizontal con underline animado */}
      <nav className={`pub-navbar__nav ${open ? 'pub-navbar__nav--open' : ''}`}>
        <ul className="pub-navbar__menu">
          <li><NavLink to="/" end onClick={close}>Inicio</NavLink></li>
          <li><NavLink to="/servicios" onClick={close}>Servicios</NavLink></li>
          <li><NavLink to="/promociones" onClick={close}>Promociones</NavLink></li>
          <li><NavLink to="/galeria" onClick={close}>Galería</NavLink></li>
          <li><a href="https://wa.me/595982137690" target="_blank" rel="noopener">Reservar</a></li>
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
