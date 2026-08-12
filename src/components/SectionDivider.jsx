// Separador ornamental entre secciones: la corona real (imagen provista por el
// cliente, extraída con fondo transparente) centrada, y las líneas se extienden
// de lado a lado con CSS (ver .section-divider en global.css).
export default function SectionDivider({ className = '' }) {
  return (
    <div className={`section-divider ${className}`} role="presentation" aria-hidden="true">
      <img src="/separador-orn.svg" alt="" className="section-divider__img" loading="lazy" />
    </div>
  )
}
