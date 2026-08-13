import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, Instagram } from 'lucide-react'
import WhatsappIcon from './WhatsappIcon.jsx'
import { useAjustes } from '../lib/ajustes.js'

export default function PublicNavbar() {
  const ajustes = useAjustes()
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
      <div className="pub-navbar__row">
        {/* Izquierda: logo + marca */}
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

        {/* Centro/derecha: menú */}
        <nav className={`pub-navbar__nav ${open ? 'pub-navbar__nav--open' : ''}`}>
          <ul className="pub-navbar__menu">
            <li><NavLink to="/" end onClick={close}>Inicio</NavLink></li>
            <li><NavLink to="/servicios" onClick={close}>Servicios</NavLink></li>
            <li><NavLink to="/promociones" onClick={close}>Promociones</NavLink></li>
            <li><NavLink to="/galeria" onClick={close}>Galería</NavLink></li>
            <li>
              <a
                href={`https://wa.me/${ajustes.whatsapp}`}
                target="_blank"
                rel="noopener"
                className="pub-navbar__cta"
                onClick={close}
              >
                <WhatsappIcon size={18} />
                <span>Reservar</span>
              </a>
            </li>
            {ajustes.instagram_url && (
              <li>
                <a
                  href={ajustes.instagram_url}
                  target="_blank"
                  rel="noopener"
                  className="pub-navbar__cta pub-navbar__cta--alt"
                  onClick={close}
                >
                  <Instagram size={18} strokeWidth={2} />
                  <span>Instagram</span>
                </a>
              </li>
            )}
          </ul>
        </nav>

        {/* Toggle móvil */}
        <button
          className="pub-navbar__toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menú"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
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
