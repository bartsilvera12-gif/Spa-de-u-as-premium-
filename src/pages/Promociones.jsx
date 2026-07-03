import { useEffect, useState } from 'react'
import PublicNavbar from '../components/PublicNavbar.jsx'
import PublicFooter from '../components/PublicFooter.jsx'
import PromoCard from '../components/PromoCard.jsx'
import { getCategorias, getServicios } from '../lib/services.js'

const INITIAL = 4

export default function Promociones() {
  const [promos, setPromos] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandido, setExpandido] = useState(false)

  useEffect(() => {
    (async () => {
      const [cats, servs] = await Promise.all([getCategorias(), getServicios()])
      const promoCat = cats.find((c) => c.slug === 'promociones')
      setPromos(promoCat ? servs.filter((s) => s.categoria_id === promoCat.id) : [])
      setLoading(false)
    })()
  }, [])

  const visibles = expandido ? promos : promos.slice(0, INITIAL)
  const restantes = promos.length - INITIAL

  return (
    <>
      <PublicNavbar />
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
          {loading && <div className="state"><div className="spinner" /></div>}
          {!loading && promos.length === 0 && (
            <div className="state">
              <div className="state__title">No hay promociones activas</div>
              <p>Volvé a mirar pronto, siempre estamos preparando algo nuevo.</p>
            </div>
          )}
          {!loading && promos.length > 0 && (
            <>
              <div className="cat-grid">
                {visibles.map((s) => <PromoCard key={s.id} servicio={s} />)}
              </div>
              {!expandido && restantes > 0 && (
                <div style={{ textAlign: 'center', marginTop: 40 }}>
                  <button className="btn btn--primary" onClick={() => setExpandido(true)}>
                    Ver más ({restantes})
                  </button>
                </div>
              )}
              {expandido && promos.length > INITIAL && (
                <div style={{ textAlign: 'center', marginTop: 40 }}>
                  <button className="btn btn--outline" onClick={() => setExpandido(false)}>
                    Ver menos
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <PublicFooter />
    </>
  )
}
