import { Link } from 'react-router-dom'
import { MessageCircle, Instagram, MapPin } from 'lucide-react'

export default function PublicFooter() {
  return (
    <footer className="pub-footer">
      <div className="pub-footer__inner">
        <div className="pub-footer__col">
          <div className="pub-footer__brand">
            <span className="pub-footer__logo">S</span>
            <span>Spa de Uñas Premium</span>
          </div>
          <p className="pub-footer__desc">
            Un espacio pensado para regalarte tiempo. Manicura, esculpidas, spa
            y nail art con atención personalizada.
          </p>
        </div>

        <div className="pub-footer__col">
          <h4>Navegación</h4>
          <Link to="/">Inicio</Link>
          <Link to="/servicios">Servicios</Link>
          <Link to="/promociones">Promociones</Link>
          <Link to="/galeria">Galería</Link>
          <Link to="/politicadeprivacidad">Política de privacidad</Link>
        </div>

        <div className="pub-footer__col">
          <h4>Contacto</h4>
          <a href="https://wa.me/595982137690" target="_blank" rel="noopener">
            <MessageCircle size={16} /> WhatsApp
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener">
            <Instagram size={16} /> Instagram
          </a>
          <p className="pub-footer__loc">
            <MapPin size={16} /> Asunción, Paraguay
          </p>
        </div>
      </div>
      <div className="pub-footer__bottom">
        <span>© {new Date().getFullYear()} Spa de Uñas Premium. Todos los derechos reservados.</span>
        <span className="pub-footer__bottom-sep">·</span>
        <span>Desarrollado por <a href="https://neura.com.py" target="_blank" rel="noopener"><strong>NEURA</strong></a></span>
      </div>
    </footer>
  )
}
