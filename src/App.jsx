import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Servicios from './pages/Servicios.jsx'
import Galeria from './pages/Galeria.jsx'
import PoliticaPrivacidad from './pages/PoliticaPrivacidad.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminCategorias from './pages/admin/AdminCategorias.jsx'
import AdminServicios from './pages/admin/AdminServicios.jsx'
import ProtectedAdminRoute from './routes/ProtectedAdminRoute.jsx'

export default function App() {
  return (
    <Routes>
      {/* Público */}
      <Route path="/" element={<Home />} />
      <Route path="/servicios" element={<Servicios />} />
      <Route path="/galeria" element={<Galeria />} />
      <Route path="/politicadeprivacidad" element={<PoliticaPrivacidad />} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="categorias" element={<AdminCategorias />} />
        <Route path="servicios" element={<AdminServicios />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
