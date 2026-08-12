import WhatsappIcon from './WhatsappIcon.jsx'

const WHATSAPP = '595982137690'

// Botón flotante de WhatsApp (fijo abajo a la derecha) en los colores de la marca.
export default function WhatsappFloat() {
  return (
    <a
      className="wa-float"
      href={`https://wa.me/${WHATSAPP}`}
      target="_blank"
      rel="noopener"
      aria-label="Escribinos por WhatsApp"
      title="Escribinos por WhatsApp"
    >
      <WhatsappIcon size={32} />
    </a>
  )
}
