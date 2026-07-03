export default function ServiceCard({ servicio }) {
  return (
    <div className="serv-card__wrap">
      {servicio.destacado && <span className="serv-card__badge">Destacado</span>}
      <article className="serv-card serv-card--image-only">
        <div
          className="serv-card__img"
          style={{ backgroundImage: `url(${servicio.imagen_url || '/hero-principal.jpg'})` }}
          role="img"
          aria-label={servicio.nombre}
        />
      </article>
    </div>
  )
}
