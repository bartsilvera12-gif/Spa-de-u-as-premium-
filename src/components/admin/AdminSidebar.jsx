import { NavLink } from 'react-router-dom'
import { LayoutDashboard, FolderHeart, Sparkles, ExternalLink, LogOut } from 'lucide-react'
import { supabase } from '../../lib/supabase.js'

export default function AdminSidebar({ onLogout }) {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    onLogout?.()
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">
        <span className="admin-sidebar__logo">S</span>
        <div className="admin-sidebar__brand-text">
          Spa de Uñas
          <small>Panel administrativo</small>
        </div>
      </div>

      <NavLink to="/admin" end className={({ isActive }) => 'admin-sidebar__link' + (isActive ? ' active' : '')}>
        <LayoutDashboard size={18} /> Dashboard
      </NavLink>
      <NavLink to="/admin/categorias" className={({ isActive }) => 'admin-sidebar__link' + (isActive ? ' active' : '')}>
        <FolderHeart size={18} /> Categorías
      </NavLink>
      <NavLink to="/admin/servicios" className={({ isActive }) => 'admin-sidebar__link' + (isActive ? ' active' : '')}>
        <Sparkles size={18} /> Servicios
      </NavLink>

      <div className="admin-sidebar__foot">
        <a href="/" target="_blank" rel="noopener" className="admin-sidebar__link">
          <ExternalLink size={18} /> Ver web pública
        </a>
        <button className="admin-sidebar__link" onClick={handleLogout} style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}>
          <LogOut size={18} /> Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
