import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import PublicNavbar from '../components/PublicNavbar.jsx'
import PublicFooter from '../components/PublicFooter.jsx'
import PromoCard from '../components/PromoCard.jsx'
import FeatureCarousel from '../components/FeatureCarousel.jsx'
import SectionDivider from '../components/SectionDivider.jsx'
import { getCategorias, getServicios } from '../lib/services.js'
import { fallbackGaleria } from '../data/fallbackData.js'
import { catalogo } from '../data/catalogo.js'

const WHATSAPP = '595982137690'

function reservaLink(nombre) {
  const msg = encodeURIComponent(`Hola! Quisiera reservar un turno de ${nombre}.`)
  return `https://wa.me/${WHATSAPP}?text=${msg}`
}

function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Home() {
  const [promos, setPromos] = useState([])
  const [loading, setLoading] = useState(true)
  const [abierta, setAbierta] = useState(null)
  // Fuente del carrusel: galería fija + todas las imágenes de servicios del catálogo.
  const carruselImgs = useMemo(() => {
    const desdeCatalogo = catalogo.flatMap((area) =>
      (area.grupos || []).flatMap((g) =>
        (g.servicios || [])
          .map((s) => (typeof s === 'string' ? null : s?.img))
          .filter(Boolean)
          .map((img) => ({ src: img, categoria: area.nombre }))
      )
    )
    const combinadas = [...fallbackGaleria, ...desdeCatalogo]
    // Deduplicar por src.
    const vistos = new Set()
    const unicas = combinadas.filter((x) => {
      if (vistos.has(x.src)) return false
      vistos.add(x.src)
      return true
    })
    return shuffle(unicas).slice(0, 30)
  }, [])

  useEffect(() => {
    (async () => {
      const [cats, servs] = await Promise.all([getCategorias(), getServicios()])
      const promoCat = cats.find((c) => c.slug === 'promociones')
      const promoList = promoCat ? servs.filter((s) => s.categoria_id === promoCat.id) : []
      setPromos(promoList.slice(0, 4))
      setLoading(false)
    })()
  }, [])

  return (
    <>
      <PublicNavbar />

      <section className="hero">
        <div className="hero__inner">
          <div>
            <span className="hero__eyebrow">Centro de belleza integral</span>
            <h1 className="hero__title">
              Tu belleza, <em>en un solo lugar</em>.
            </h1>
            <p className="hero__desc">
              Estética facial y corporal, spa, peluquería, uñas, maquillaje y
              experiencias de bienestar premium. Un espacio pensado para cuidarte
              de la cabeza a los pies.
            </p>
            <div className="hero__ctas">
              <a className="btn btn--primary" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener">
                Reservar por WhatsApp
              </a>
              <Link className="btn btn--outline" to="/servicios">Ver servicios</Link>
            </div>
          </div>
          <div className="hero__image" style={{ backgroundImage: 'url(/hero-principal.jpg)' }} />
        </div>
      </section>

      <SectionDivider />

      <section className="section">
        <div className="section__head">
          <div className="section__eyebrow">Explorá</div>
          <h2 className="section__title">Todas nuestras áreas y servicios</h2>
          <p className="section__desc">
            Elegí un área y descubrí todos sus servicios. Reservá el que quieras por WhatsApp.
          </p>
        </div>
        <FeatureCarousel />
      </section>

      <SectionDivider />

      {/* Sección "Áreas" ocultada: su contenido ya está en "Todas nuestras áreas y servicios". */}
      {false && (
      <section className="section">
        <div className="section__head">
          <div className="section__eyebrow">Áreas</div>
          <h2 className="section__title">Todo lo que hacemos por vos</h2>
          <p className="section__desc">
            Un catálogo completo de belleza, estética y bienestar. Explorá cada
            área y reservá el ritual que buscás.
          </p>
        </div>
        <div className="area-grid">
          {catalogo.map((c) => {
            const open = abierta === c.id
            return (
              <div key={c.id} className={`area-item ${open ? 'area-item--open' : ''}`}>
                <button
                  className="area-card"
                  aria-expanded={open}
                  onClick={() => setAbierta(open ? null : c.id)}
                >
                  <span className="area-card__icon" aria-hidden="true">{c.icono}</span>
                  <div className="area-card__body">
                    <h3 className="area-card__title">{c.nombre}</h3>
                    <p className="area-card__desc">{c.descripcion}</p>
                  </div>
                  <ChevronDown className="area-card__chevron" size={22} aria-hidden="true" />
                </button>

                {open && (
                  <div className="area-panel">
                    <div className="area-panel__groups">
                      {c.grupos.map((g, i) => (
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
                    <a
                      className="btn btn--primary btn--sm area-panel__cta"
                      href={reservaLink(c.nombre)}
                      target="_blank"
                      rel="noopener"
                    >
                      Reservar {c.nombre}
                    </a>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
      )}

      <section className="carrusel-section">
        <div className="section__head">
          <div className="section__eyebrow">Nuestros trabajos</div>
          <h2 className="section__title">Un vistazo a lo que hacemos</h2>
        </div>
        <div className="carrusel">
          <div className="carrusel__track">
            {[...carruselImgs, ...carruselImgs].map((img, i) => (
              <div
                key={`${img.src}-${i}`}
                className="carrusel__item"
                style={{ backgroundImage: `url(${img.src})` }}
                aria-label={img.categoria}
              />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="section experiencia">
        <div className="experiencia__inner">
          <div className="experiencia__image" style={{ backgroundImage: 'url(/experiencia.jpg)' }} />
          <div className="experiencia__text">
            <div className="section__eyebrow">La experiencia</div>
            <h2 className="section__title">Un ritual pensado en cada detalle</h2>
            <p style={{ color: 'var(--ink-soft)', marginBottom: 14 }}>
              Combinamos estética avanzada, spa y bienestar con productos premium,
              tecnología de última generación y profesionales especializados. Cada
              cita se agenda con espacio suficiente para que disfrutes sin apuros.
            </p>
            <ul className="experiencia__list">
              <li>Atención personalizada y sin superposición de turnos.</li>
              <li>Aparatología y productos profesionales de primera calidad.</li>
              <li>Ambiente relajante con música suave y aromaterapia.</li>
              <li>Higiene certificada y esterilización de todo el instrumental.</li>
            </ul>
            <div style={{ marginTop: 20 }}>
              <a className="btn btn--primary" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener">
                Reservar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {!loading && promos.length > 0 && (
        <section className="section">
          <div className="section__head">
            <div className="section__eyebrow">Promociones</div>
            <h2 className="section__title">Combos y packs especiales</h2>
            <p className="section__desc">
              Aprovechá nuestros combos y packs pensados para regalarte más
              momentos por menos. Disponibilidad limitada del mes.
            </p>
          </div>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="cat-grid">
              {promos.map((s) => <PromoCard key={s.id} servicio={s} />)}
            </div>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link className="btn btn--primary" to="/promociones">
                Ver todo
              </Link>
            </div>
          </div>
        </section>
      )}

      {!loading && promos.length > 0 && <SectionDivider />}

      <section className="section testimonios">
        <div className="section__head">
          <div className="section__eyebrow">Testimonios</div>
          <h2 className="section__title">Lo que dicen nuestras clientas</h2>
        </div>
        <div className="testi-grid">
          <article className="testi-card">
            <div className="testi-card__stars">★★★★★</div>
            <p className="testi-card__text">
              “Un ambiente hermoso y súper prolijo. Salí renovada después de mi
              tratamiento facial, la piel me quedó espectacular.”
            </p>
            <div className="testi-card__author">
              <span className="testi-card__avatar">C</span>
              <div>
                <strong>Carolina F.</strong>
                <small>Estética facial</small>
              </div>
            </div>
          </article>
          <article className="testi-card">
            <div className="testi-card__stars">★★★★★</div>
            <p className="testi-card__text">
              “Me hicieron el ritual bridal completo y fue una experiencia soñada.
              Muy atentas, detallistas y el resultado fue perfecto para mi día.”
            </p>
            <div className="testi-card__author">
              <span className="testi-card__avatar">M</span>
              <div>
                <strong>María José R.</strong>
                <small>Programa Premium</small>
              </div>
            </div>
          </article>
          <article className="testi-card">
            <div className="testi-card__stars">★★★★★</div>
            <p className="testi-card__text">
              “El masaje descontracturante y el circuito de spa son lo mejor de
              Asunción. Ya reservé mi próxima sesión, no me atiendo en otro lado.”
            </p>
            <div className="testi-card__author">
              <span className="testi-card__avatar">L</span>
              <div>
                <strong>Lucía A.</strong>
                <small>Masajes & Spa</small>
              </div>
            </div>
          </article>
        </div>
      </section>

      <PublicFooter />
    </>
  )
}
