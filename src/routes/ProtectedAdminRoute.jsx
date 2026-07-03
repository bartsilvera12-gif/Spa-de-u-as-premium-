import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'

export default function ProtectedAdminRoute({ children }) {
  const [state, setState] = useState({ loading: true, ok: false })

  useEffect(() => {
    let cancel = false
    ;(async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { if (!cancel) setState({ loading: false, ok: false }); return }

      const { data: profile, error } = await supabase
        .from('admin_profiles')
        .select('id, activo')
        .eq('user_id', session.user.id)
        .maybeSingle()

      if (cancel) return
      if (error || !profile || !profile.activo) {
        await supabase.auth.signOut()
        setState({ loading: false, ok: false })
      } else {
        setState({ loading: false, ok: true })
      }
    })()
    return () => { cancel = true }
  }, [])

  if (state.loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--bg)' }}>
        <div className="spinner" />
      </div>
    )
  }
  if (!state.ok) return <Navigate to="/admin/login" replace />
  return children
}
