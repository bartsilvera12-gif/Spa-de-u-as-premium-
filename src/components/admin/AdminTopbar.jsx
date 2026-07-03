import { UserCircle2 } from 'lucide-react'

export default function AdminTopbar({ title, email }) {
  return (
    <div className="admin-topbar">
      <h1 className="admin-topbar__title">{title}</h1>
      <div className="admin-topbar__user">
        <UserCircle2 size={22} /> {email || 'Administrador'}
      </div>
    </div>
  )
}
