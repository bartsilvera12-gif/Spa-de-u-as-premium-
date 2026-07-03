import { useState } from 'react'
import { X } from 'lucide-react'
import PublicNavbar from '../components/PublicNavbar.jsx'
import PublicFooter from '../components/PublicFooter.jsx'
import { fallbackGaleria } from '../data/fallbackData.js'

export default function Galeria() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <>
      <PublicNavbar />
      <section className="section">
        <div className="section__head">
          <div className="section__eyebrow">Galería</div>
          <h2 className="section__title">Nuestros trabajos</h2>
          <p className="section__desc">Un vistazo a los rituales, colores y diseños que compartimos con nuestras clientas.</p>
        </div>

        <div className="gal-grid">
          {fallbackGaleria.map((img) => (
            <button
              key={img.src}
              className="gal-item"
              style={{ backgroundImage: `url(${img.src})` }}
              aria-label={img.categoria}
              onClick={() => setLightbox(img.src)}
            />
          ))}
        </div>
      </section>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox__close" aria-label="Cerrar"><X size={20} /></button>
          <img src={lightbox} alt="" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <PublicFooter />
    </>
  )
}
