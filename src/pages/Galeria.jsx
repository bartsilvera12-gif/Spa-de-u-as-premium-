import { useMemo, useState } from 'react'
import { X } from 'lucide-react'
import PublicNavbar from '../components/PublicNavbar.jsx'
import PublicFooter from '../components/PublicFooter.jsx'
import { fallbackGaleria } from '../data/fallbackData.js'
import { catalogo } from '../data/catalogo.js'

function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Galeria() {
  const [lightbox, setLightbox] = useState(null)

  // Todas las imágenes: galería fija + todas las fotos del catálogo, sin duplicados y en orden aleatorio.
  const imagenes = useMemo(() => {
    const desdeCatalogo = catalogo.flatMap((area) =>
      (area.grupos || []).flatMap((g) =>
        (g.servicios || [])
          .map((s) => (typeof s === 'string' ? null : s?.img))
          .filter(Boolean)
          .map((img) => ({ src: img, categoria: area.nombre }))
      )
    )
    const todas = [...fallbackGaleria, ...desdeCatalogo]
    const vistos = new Set()
    const unicas = todas.filter((x) => {
      if (vistos.has(x.src)) return false
      vistos.add(x.src)
      return true
    })
    return shuffle(unicas)
  }, [])

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
          {imagenes.map((img) => (
            <button
              key={img.src}
              className="gal-item"
              aria-label={img.categoria}
              onClick={() => setLightbox(img.src)}
            >
              <img className="gal-item__img" src={img.src} alt={img.categoria} loading="lazy" />
            </button>
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
