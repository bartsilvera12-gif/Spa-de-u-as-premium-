import { Link } from 'react-router-dom'
import { Instagram, Facebook, Music2, Mail, MapPin } from 'lucide-react'
import WhatsappIcon from './WhatsappIcon.jsx'
import WhatsappFloat from './WhatsappFloat.jsx'
import { useAjustes } from '../lib/ajustes.js'

export default function PublicFooter() {
  const ajustes = useAjustes()
  return (
    <footer className="pub-footer">
      <WhatsappFloat />
      <div className="pub-footer__inner">
        <div className="pub-footer__col">
          <div className="pub-footer__brand">
            <img className="pub-footer__logo" src="/logo.png" alt="Dálida Beauty & Spa" />
            <span>Dálida Beauty &amp; Spa</span>
          </div>
          <p className="pub-footer__desc">
            Centro de belleza integral premium. Estética facial y corporal, spa,
            peluquería, uñas y bienestar con atención personalizada.
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
          <a href={`https://wa.me/${ajustes.whatsapp}`} target="_blank" rel="noopener">
            <WhatsappIcon size={16} /> WhatsApp
          </a>
          {ajustes.instagram_url && (
            <a href={ajustes.instagram_url} target="_blank" rel="noopener">
              <Instagram size={16} /> Instagram
            </a>
          )}
          {ajustes.facebook_url && (
            <a href={ajustes.facebook_url} target="_blank" rel="noopener">
              <Facebook size={16} /> Facebook
            </a>
          )}
          {ajustes.tiktok_url && (
            <a href={ajustes.tiktok_url} target="_blank" rel="noopener">
              <Music2 size={16} /> TikTok
            </a>
          )}
          {ajustes.email && (
            <a href={`mailto:${ajustes.email}`}>
              <Mail size={16} /> {ajustes.email}
            </a>
          )}
          {ajustes.direccion && (
            <p className="pub-footer__loc">
              <MapPin size={16} /> {ajustes.direccion}
            </p>
          )}
        </div>
      </div>
      <div className="pub-footer__bottom">
        <span>© {new Date().getFullYear()} Dálida Beauty &amp; Spa. Todos los derechos reservados.</span>
        <span>Desarrollado por <a href="https://neura.com.py" target="_blank" rel="noopener"><strong>NEURA</strong></a></span>
      </div>
    </footer>
  )
}
