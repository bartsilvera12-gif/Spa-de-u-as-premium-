import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase.js'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setLoading(false)
      setError('Email o contraseña incorrectos.')
      return
    }

    const { data: profile, error: pErr } = await supabase
      .from('admin_profiles')
      .select('id, activo')
      .eq('user_id', data.user.id)
      .maybeSingle()

    if (pErr || !profile || !profile.activo) {
      await supabase.auth.signOut()
      setLoading(false)
      setError('Tu usuario no tiene permisos de administrador.')
      return
    }

    navigate('/admin', { replace: true })
  }

  return (
    <div className="login-shell">
      <div className="login-card">
        <img className="login-logo" src="/logo.png" alt="Spa de Uñas Premium" />
        <h1 className="login-title">Panel administrativo</h1>
        <p className="login-sub">Gestioná servicios, precios y categorías</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>

        <Link to="/" className="login-back">← Volver a la web</Link>
      </div>
    </div>
  )
}
