import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import AdminSidebar from '../../components/admin/AdminSidebar.jsx'
import AdminTopbar from '../../components/admin/AdminTopbar.jsx'
import { supabase } from '../../lib/supabase.js'

const TITLES = {
  '/admin': 'Dashboard',
  '/admin/categorias': 'Categorías',
  '/admin/servicios': 'Servicios',
}

export default function AdminLayout() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data?.user?.email || ''))
  }, [])

  const title = TITLES[location.pathname] || 'Panel'

  return (
    <div className="admin-shell">
      <AdminSidebar onLogout={() => navigate('/admin/login', { replace: true })} />
      <div className="admin-main">
        <AdminTopbar title={title} email={email} />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
