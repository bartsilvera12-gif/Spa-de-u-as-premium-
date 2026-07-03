import { MessageCircle } from 'lucide-react'
import { formatGs } from '../lib/format.js'

const WHATSAPP = '595982137690'

export default function PromoCard({ servicio }) {
  const msg = encodeURIComponent(`Hola! Quisiera reservar la promo: ${servicio.nombre}.`)
  const link = `https://wa.me/${WHATSAPP}?text=${msg}`

  return (
    <article className="promo-card">
      {servicio.imagen_url && (
        <div className="promo-card__img" style={{ backgroundImage: `url(${servicio.imagen_url})` }} />
      )}
      <div className="promo-card__body">
        <h3 className="promo-card__title">{servicio.nombre}</h3>
        {servicio.descripcion && <p className="promo-card__desc">{servicio.descripcion}</p>}
        <div className="promo-card__prices">
          <span className="promo-card__price">
            {servicio.precio_desde ? 'Desde ' : ''}{formatGs(servicio.precio)}
          </span>
          {servicio.precio_anterior && (
            <span className="promo-card__old">{formatGs(servicio.precio_anterior)}</span>
          )}
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener"
          className="btn btn--primary promo-card__cta"
          onClick={(e) => e.stopPropagation()}
        >
          <MessageCircle size={16} /> Reservar
        </a>
      </div>
    </article>
  )
}
