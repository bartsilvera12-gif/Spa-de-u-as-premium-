import WhatsappIcon from './WhatsappIcon.jsx'
import { useAjustes } from '../lib/ajustes.js'

// Botón flotante de WhatsApp (fijo abajo a la derecha) en los colores de la marca.
export default function WhatsappFloat() {
  const ajustes = useAjustes()
  return (
    <a
      className="wa-float"
      href={`https://wa.me/${ajustes.whatsapp}`}
      target="_blank"
      rel="noopener"
      aria-label="Escribinos por WhatsApp"
      title="Escribinos por WhatsApp"
    >
      <WhatsappIcon size={32} />
    </a>
  )
}
