import PublicNavbar from '../components/PublicNavbar.jsx'
import PublicFooter from '../components/PublicFooter.jsx'
import { MessageCircle } from 'lucide-react'
import { catalogo } from '../data/catalogo.js'

const WHATSAPP = '595982137690'

function reservaLink(nombre) {
  const msg = encodeURIComponent(`Hola! Quisiera reservar un turno de ${nombre}.`)
  return `https://wa.me/${WHATSAPP}?text=${msg}`
}

export default function Servicios() {
  return (
    <>
      <PublicNavbar />
      <section className="section">
        <div className="section__head">
          <div className="section__eyebrow">Carta de servicios</div>
          <h2 className="section__title">Un centro de belleza integral</h2>
          <p className="section__desc">
            Explorá todas nuestras áreas de estética, spa y bienestar. Coordiná
            precios, duración y disponibilidad de cada servicio por WhatsApp.
          </p>
        </div>

        {/* Índice rápido de categorías */}
        <nav className="cat-index" aria-label="Categorías">
          {catalogo.map((cat) => (
            <a key={cat.id} className="cat-index__chip" href={`#${cat.id}`}>
              <span className="cat-index__icon" aria-hidden="true">{cat.icono}</span>
              {cat.nombre}
            </a>
          ))}
        </nav>

        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {catalogo.map((cat) => (
            <section key={cat.id} id={cat.id} className="cat-block">
              <header className="cat-block__head">
                <span className="cat-block__icon" aria-hidden="true">{cat.icono}</span>
                <div>
                  <h3 className="cat-block__title">{cat.nombre}</h3>
                  {cat.descripcion && <p className="cat-block__desc">{cat.descripcion}</p>}
                </div>
                <a
                  className="btn btn--primary btn--sm cat-block__cta"
                  href={reservaLink(cat.nombre)}
                  target="_blank"
                  rel="noopener"
                >
                  <MessageCircle size={15} /> Reservar
                </a>
              </header>

              <div className="cat-block__groups">
                {cat.grupos.map((g, i) => (
                  <div key={i} className="serv-group">
                    {g.titulo && <h4 className="serv-group__title">{g.titulo}</h4>}
                    <ul className="serv-list">
                      {g.servicios.map((s) => {
                        const nombre = typeof s === 'string' ? s : s.nombre
                        const img = typeof s === 'object' ? s.img : null
                        return (
                          <li key={nombre} className={`serv-list__item ${img ? 'serv-list__item--img' : ''}`}>
                            <a href={reservaLink(nombre)} target="_blank" rel="noopener" title={`Reservar ${nombre}`}>
                              {img && <img className="serv-list__thumb" src={img} alt={nombre} loading="lazy" />}
                              <span>{nombre}</span>
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
      <PublicFooter />
    </>
  )
}
