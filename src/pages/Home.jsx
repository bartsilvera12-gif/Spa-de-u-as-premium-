import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PublicNavbar from '../components/PublicNavbar.jsx'
import PublicFooter from '../components/PublicFooter.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import { getCategorias } from '../lib/services.js'

export default function Home() {
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const cats = await getCategorias()
      setCategorias(cats.filter((c) => c.slug !== 'promociones'))
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
          <div className="section__eyebrow">Servicios</div>
          <h2 className="section__title">Todo lo que hacemos por vos</h2>
          <p className="section__desc">
            Explorá nuestras categorías. Cada servicio está pensado para brindarte
            un momento de bienestar y estética premium.
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

      <PublicFooter />
    </>
  )
}
