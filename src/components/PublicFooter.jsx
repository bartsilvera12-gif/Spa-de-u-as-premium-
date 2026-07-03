import { Link } from 'react-router-dom'

export default function PublicFooter() {
  return (
    <footer className="pub-footer">
      <div className="pub-footer__inner">
        <div>
          <h4>Spa de Uñas Premium</h4>
          <p style={{ opacity: .8, fontSize: '.9rem' }}>
            Un espacio pensado para regalarte tiempo. Manicura, esculpidas, spa y nail art
            con atención personalizada.
          </p>
        </div>
        <div>
          <h4>Navegación</h4>
          <Link to="/">Inicio</Link>
          <Link to="/servicios">Servicios</Link>
          <Link to="/galeria">Galería</Link>
          <Link to="/politicadeprivacidad">Política de privacidad</Link>
        </div>
        <div>
          <h4>Contacto</h4>
          <a href="https://wa.me/595984123456" target="_blank" rel="noopener">WhatsApp</a>
          <a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a>
          <p style={{ marginTop: 10, fontSize: '.9rem', opacity: .8 }}>Asunción, Paraguay</p>
        </div>
      </div>
      <div className="pub-footer__bottom">
        © {new Date().getFullYear()} Spa de Uñas Premium. Todos los derechos reservados.
      </div>
    </footer>
  )
}
