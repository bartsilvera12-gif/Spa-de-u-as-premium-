import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { catalogo as staticCatalogo } from '../data/catalogo.js'
import { getCatalogo, invalidateCache } from '../lib/services.js'
import { useLiveRefetch } from '../lib/useLiveRefetch.js'

const WHATSAPP = '595982137690'
const AUTO_PLAY_INTERVAL = 3500

function reservaLink(nombre) {
  const msg = encodeURIComponent(`Hola! Quisiera reservar un turno de ${nombre}.`)
  return `https://wa.me/${WHATSAPP}?text=${msg}`
}

// prev / active / next / hidden según la distancia circular al índice actual.
function cardStatus(index, current, len) {
  let d = index - current
  if (d > len / 2) d -= len
  if (d < -len / 2) d += len
  if (d === 0) return 'active'
  if (d === -1) return 'prev'
  if (d === 1) return 'next'
  return 'hidden'
}

export default function FeatureCarousel() {
  // El catálogo se lee de Supabase (getCatalogo); arranca con el estático para
  // render inmediato y como fallback si Supabase no responde.
  const [AREAS, setAREAS] = useState(staticCatalogo)
  const cargar = useCallback(() => {
    invalidateCache()
    getCatalogo().then((c) => { if (Array.isArray(c) && c.length) setAREAS(c) })
  }, [])
  useEffect(() => { cargar() }, [cargar])
  useLiveRefetch(cargar)   // refresca al volver a la pestaña

  // Área seleccionada (panel izquierdo).
  const [areaIndex, setAreaIndex] = useState(0)
  const area = AREAS[areaIndex] || AREAS[0]

  // Productos del área seleccionada, aplanados a una lista con imagen opcional.
  const productos = area.grupos.flatMap((g) =>
    g.servicios.map((s) => (typeof s === 'string' ? { nombre: s, img: null } : s))
  )
  const prodLen = productos.length

  // Carrusel de productos (panel derecho).
  const [prodStep, setProdStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const prodIndex = ((prodStep % prodLen) + prodLen) % prodLen

  // Al cambiar de área, volver al primer producto.
  useEffect(() => { setProdStep(0) }, [areaIndex])

  const nextProd = useCallback(() => setProdStep((p) => p + 1), [])
  const prevProd = useCallback(() => setProdStep((p) => p - 1), [])

  useEffect(() => {
    if (isPaused || prodLen <= 1) return
    const t = setInterval(nextProd, AUTO_PLAY_INTERVAL)
    return () => clearInterval(t)
  }, [nextProd, isPaused, prodLen])

  return (
    <div
      className="fcar"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Panel izquierdo: áreas del spa (lista con scroll) */}
      <div className="fcar__panel fcar__panel--scroll">
        <ul className="fcar__arealist">
          {AREAS.map((a, index) => {
            const isActive = index === areaIndex
            return (
              <li key={a.id}>
                <button
                  className={`fcar__chip ${isActive ? 'fcar__chip--active' : ''}`}
                  onClick={() => setAreaIndex(index)}
                >
                  <span className="fcar__chip-emoji" aria-hidden="true">{a.icono}</span>
                  <span>{a.nombre}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Panel derecho: carrusel de productos del área elegida */}
      <div className="fcar__stage">
        <button className="fcar__arrow fcar__arrow--prev" onClick={prevProd} aria-label="Producto anterior">
          <ChevronLeft size={24} strokeWidth={2.2} />
        </button>
        <button className="fcar__arrow fcar__arrow--next" onClick={nextProd} aria-label="Producto siguiente">
          <ChevronRight size={24} strokeWidth={2.2} />
        </button>

        <div className="fcar__pcards">
          {productos.map((p, index) => {
            const status = cardStatus(index, prodIndex, prodLen)
            return (
              <a
                key={`${p.nombre}-${index}`}
                className={`fcar__pcard fcar__pcard--${status}`}
                href={reservaLink(p.nombre)}
                target="_blank"
                rel="noopener"
                title={`Reservar ${p.nombre}`}
              >
                {p.img ? (
                  <img className="fcar__pimg" src={p.img} alt={p.nombre} loading="lazy" />
                ) : (
                  <div className="fcar__pfallback">
                    <span aria-hidden="true">{area.icono}</span>
                  </div>
                )}
                <div className="fcar__poverlay">
                  <span className="fcar__badge">{area.icono} {area.nombre}</span>
                  <p className="fcar__pname">{p.nombre}</p>
                  <span className="fcar__pcta">Reservar por WhatsApp →</span>
                </div>
              </a>
            )
          })}
        </div>

        <div className="fcar__counter">{prodIndex + 1} / {prodLen}</div>
      </div>
    </div>
  )
}
