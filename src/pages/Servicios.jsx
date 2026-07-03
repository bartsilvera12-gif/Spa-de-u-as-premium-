import { useEffect, useState } from 'react'
import PublicNavbar from '../components/PublicNavbar.jsx'
import PublicFooter from '../components/PublicFooter.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import { getServiciosPorCategoria } from '../lib/services.js'

export default function Servicios() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const grupos = await getServiciosPorCategoria()
      setData(grupos)
      setLoading(false)
    })()
  }, [])

  return (
    <>
      <PublicNavbar />
      <section className="section">
        <div className="section__head">
          <div className="section__eyebrow">Carta de servicios</div>
          <h2 className="section__title">Rituales pensados para vos</h2>
          <p className="section__desc">
            Consultá precios y duraciones. Los servicios pueden combinarse en packs
            especiales. Reservá por WhatsApp para asegurar tu horario.
          </p>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {loading && <div className="state"><div className="spinner" /></div>}
          {!loading && data.length === 0 && (
            <div className="state">
              <div className="state__title">No hay servicios disponibles</div>
              <p>Volvé a intentar más tarde.</p>
            </div>
          )}
          {!loading && data.map((cat) => (
            cat.servicios?.length > 0 && (
              <div key={cat.id} className="cat-group">
                <div className="cat-group__head">
                  <h3 className="cat-group__title">{cat.nombre}</h3>
                  {cat.descripcion && <span className="cat-group__desc">{cat.descripcion}</span>}
                </div>
                <div className="serv-grid">
                  {cat.servicios.map((s) => <ServiceCard key={s.id} servicio={s} />)}
                </div>
              </div>
            )
          ))}
        </div>
      </section>
      <PublicFooter />
    </>
  )
}
