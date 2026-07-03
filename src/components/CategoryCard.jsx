export default function CategoryCard({ categoria, onClick }) {
  return (
    <div className="cat-card" onClick={onClick} role="button" tabIndex={0}
         onKeyDown={(e) => e.key === 'Enter' && onClick?.()}>
      <div className="cat-card__img" style={{ backgroundImage: `url(${categoria.imagen_url || '/hero-principal.jpg'})` }} />
      <div className="cat-card__body">
        <h3 className="cat-card__title">{categoria.nombre}</h3>
        {categoria.descripcion && <p className="cat-card__desc">{categoria.descripcion}</p>}
      </div>
    </div>
  )
}
