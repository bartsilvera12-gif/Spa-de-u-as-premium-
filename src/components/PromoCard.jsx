import { formatGs } from '../lib/format.js'

export default function PromoCard({ servicio }) {
  return (
    <div className="promo-card">
      <h3 className="promo-card__title">{servicio.nombre}</h3>
      {servicio.descripcion && <p className="promo-card__desc">{servicio.descripcion}</p>}
      <div>
        <span className="promo-card__price">
          {servicio.precio_desde ? 'Desde ' : ''}{formatGs(servicio.precio)}
        </span>
        {servicio.precio_anterior && (
          <span className="promo-card__old">{formatGs(servicio.precio_anterior)}</span>
        )}
      </div>
    </div>
  )
}
