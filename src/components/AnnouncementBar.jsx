import { useEffect, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const MENSAJES = [
  '🎁 Regalo especial en reservas superiores a Gs. 300.000',
  '✨ 15% de descuento en tu primera visita',
  '💇‍♀️ Nueva sección de peluquería y coloración',
  '📅 Reservá tu turno directo por WhatsApp',
  '⭐ Programas premium y experiencias VIP',
]

const AUTO_MS = 5000

export default function AnnouncementBar() {
  const [i, setI] = useState(0)
  const n = MENSAJES.length

  const next = useCallback(() => setI((v) => (v + 1) % n), [n])
  const prev = useCallback(() => setI((v) => (v - 1 + n) % n), [n])

  useEffect(() => {
    const t = setInterval(next, AUTO_MS)
    return () => clearInterval(t)
  }, [next])

  return (
    <div className="ann-bar">
      <button className="ann-bar__arrow" onClick={prev} aria-label="Anterior">
        <ChevronLeft size={16} strokeWidth={2.2} />
      </button>
      <div className="ann-bar__stage" aria-live="polite">
        {MENSAJES.map((m, idx) => (
          <span
            key={idx}
            className={'ann-bar__msg ' + (idx === i ? 'ann-bar__msg--active' : '')}
          >
            {m}
          </span>
        ))}
      </div>
      <button className="ann-bar__arrow" onClick={next} aria-label="Siguiente">
        <ChevronRight size={16} strokeWidth={2.2} />
      </button>
    </div>
  )
}
