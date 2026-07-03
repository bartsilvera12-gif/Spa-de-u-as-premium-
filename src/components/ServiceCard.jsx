import { Clock } from 'lucide-react'
import { formatGs, formatDuracion } from '../lib/format.js'

export default function ServiceCard({ servicio }) {
  return (
    <div className="serv-card__wrap">
      {servicio.destacado && <span className="serv-card__badge">Destacado</span>}
      <article className="serv-card">
        {servicio.imagen_url && (
          <div className="serv-card__img" style={{ backgroundImage: `url(${servicio.imagen_url})` }} />
        )}
        <div className="serv-card__body">
          <h3 className="serv-card__title">{servicio.nombre}</h3>
          {servicio.descripcion && <p className="serv-card__desc">{servicio.descripcion}</p>}
          <div className="serv-card__meta">
            <div>
              {servicio.precio_anterior && (
                <span className="serv-card__price-old">{formatGs(servicio.precio_anterior)}</span>
              )}
              <span className="serv-card__price">
                {servicio.precio_desde ? 'Desde ' : ''}{formatGs(servicio.precio)}
              </span>
            </div>
            {servicio.duracion_min && (
              <span className="serv-card__dur">
                <Clock size={14} /> {formatDuracion(servicio.duracion_min)}
              </span>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}
