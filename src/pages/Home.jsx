import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PublicNavbar from '../components/PublicNavbar.jsx'
import PublicFooter from '../components/PublicFooter.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import PromoCard from '../components/PromoCard.jsx'
import { getCategorias, getServicios } from '../lib/services.js'
import { fallbackGaleria } from '../data/fallbackData.js'

function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Home() {
  const [categorias, setCategorias] = useState([])
  const [promos, setPromos] = useState([])
  const [totalPromos, setTotalPromos] = useState(0)
  const [loading, setLoading] = useState(true)
  const carruselImgs = useMemo(() => shuffle(fallbackGaleria).slice(0, 14), [])

  useEffect(() => {
    (async () => {
      const [cats, servs] = await Promise.all([getCategorias(), getServicios()])
      setCategorias(cats.filter((c) => c.slug !== 'promociones'))
      const promoCat = cats.find((c) => c.slug === 'promociones')
      const promoList = promoCat ? servs.filter((s) => s.categoria_id === promoCat.id) : []
      setTotalPromos(promoList.length)
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
            <span className="hero__eyebrow">Experiencia premium</span>
            <h1 className="hero__title">
              Manos que hablan de <em>vos</em>.
            </h1>
            <p className="hero__desc">
              Un ritual femenino de manicura, semipermanente, esculpidas y spa,
              con atención personalizada y estética delicada. Reservá tu momento.
            </p>
            <div className="hero__ctas">
              <a className="btn btn--primary" href="https://wa.me/595984123456" target="_blank" rel="noopener">
                Reservar por WhatsApp
              </a>
              <Link className="btn btn--outline" to="/servicios">Ver servicios</Link>
            </div>
          </div>
          <div className="hero__image" style={{ backgroundImage: 'url(/hero-principal.jpg)' }} />
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <div className="section__eyebrow">Categorías</div>
          <h2 className="section__title">Todo lo que hacemos por vos</h2>
          <p className="section__desc">
            Explorá nuestras categorías de servicios. Cada una está pensada
            para brindarte un momento de bienestar y estética premium.
          </p>
        </div>
        {loading ? (
          <div className="state"><div className="spinner" /></div>
        ) : (
          <div className="cat-grid">
            {categorias.map((c) => (
              <Link key={c.id} to="/servicios" style={{ textDecoration: 'none', color: 'inherit' }}>
                <CategoryCard categoria={c} />
              </Link>
            ))}
          </div>
        )}
      </section>

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

      <section className="section experiencia">
        <div className="experiencia__inner">
          <div className="experiencia__image" style={{ backgroundImage: 'url(/experiencia.jpg)' }} />
          <div className="experiencia__text">
            <div className="section__eyebrow">La experiencia</div>
            <h2 className="section__title">Un ritual pensado en cada detalle</h2>
            <p style={{ color: 'var(--ink-soft)', marginBottom: 14 }}>
              Trabajamos con productos premium, materiales de primera calidad y
              técnicas actualizadas. Cada cita se agenda con espacio suficiente
              para que puedas disfrutar sin apuros y salir con manos y pies
              impecables.
            </p>
            <ul className="experiencia__list">
              <li>Atención personalizada y sin superposición de turnos.</li>
              <li>Productos de larga duración y bajo daño para tu uña natural.</li>
              <li>Ambiente delicado con música suave y aromas relajantes.</li>
              <li>Higiene certificada y esterilización de todo el instrumental.</li>
            </ul>
            <div style={{ marginTop: 20 }}>
              <a className="btn btn--primary" href="https://wa.me/595984123456" target="_blank" rel="noopener">
                Reservar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section testimonios">
        <div className="section__head">
          <div className="section__eyebrow">Testimonios</div>
          <h2 className="section__title">Lo que dicen nuestras clientas</h2>
        </div>
        <div className="testi-grid">
          <article className="testi-card">
            <div className="testi-card__stars">★★★★★</div>
            <p className="testi-card__text">
              “Un ambiente hermoso y súper prolijo. Salí encantada con mi
              semipermanente, ya llevo tres semanas y sigue impecable.”
            </p>
            <div className="testi-card__author">
              <span className="testi-card__avatar">C</span>
              <div>
                <strong>Carolina F.</strong>
                <small>Cliente frecuente</small>
              </div>
            </div>
          </article>
          <article className="testi-card">
            <div className="testi-card__stars">★★★★★</div>
            <p className="testi-card__text">
              “Me hicieron el pack novia y fue una experiencia soñada. Muy
              atentas, detallistas y el resultado fue perfecto para mi día.”
            </p>
            <div className="testi-card__author">
              <span className="testi-card__avatar">M</span>
              <div>
                <strong>María José R.</strong>
                <small>Pack Novia</small>
              </div>
            </div>
          </article>
          <article className="testi-card">
            <div className="testi-card__stars">★★★★★</div>
            <p className="testi-card__text">
              “Las esculpidas quedaron increíbles y el nail art es una obra de
              arte. Ya reservé mi próximo turno, no me atiendo en otro lado.”
            </p>
            <div className="testi-card__author">
              <span className="testi-card__avatar">L</span>
              <div>
                <strong>Lucía A.</strong>
                <small>Cliente frecuente</small>
              </div>
            </div>
          </article>
        </div>
      </section>

      {promos.length > 0 && (
        <section className="section" style={{ background: 'var(--cream)' }}>
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
            {totalPromos > promos.length && (
              <div style={{ textAlign: 'center', marginTop: 40 }}>
                <Link className="btn btn--primary" to="/promociones">
                  Ver más ({totalPromos - promos.length})
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      <PublicFooter />
    </>
  )
}
