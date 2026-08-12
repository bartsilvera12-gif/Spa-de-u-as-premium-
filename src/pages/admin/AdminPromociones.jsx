import AdminServicios from './AdminServicios.jsx'

// Reutiliza el CRUD de Servicios pero acotado a la categoría "promociones".
export default function AdminPromociones() {
  return (
    <AdminServicios
      fixedCategoriaSlug="promociones"
      titulo="Promociones"
      ctaLabel="Nueva promoción"
    />
  )
}
