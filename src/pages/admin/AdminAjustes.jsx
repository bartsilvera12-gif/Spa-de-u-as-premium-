import { useEffect, useState } from 'react'
import { getAjustes, saveAjustes, DEFAULT_AJUSTES } from '../../lib/ajustes.js'
import { invalidateCache } from '../../lib/services.js'

export default function AdminAjustes() {
  const [form, setForm] = useState(DEFAULT_AJUSTES)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [flash, setFlash] = useState('')
  const [err, setErr] = useState('')

  useEffect(() => {
    getAjustes().then((a) => { setForm(a); setLoading(false) })
  }, [])

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setErr(''); setSaving(true)
    const { error } = await saveAjustes(form)
    setSaving(false)
    if (error) {
      setErr(error.message.includes('relation') || error.message.includes('does not exist')
        ? 'Falta crear la tabla de ajustes en la base (correr la migración 20260813_ajustes.sql).'
        : error.message)
      return
    }
    invalidateCache()
    setFlash('Cambios guardados')
    setTimeout(() => setFlash(''), 3000)
  }

  if (loading) return <div className="state"><div className="spinner" /></div>

  return (
    <>
      {err && <div className="flash-error">{err}</div>}

      <div className="admin-card">
        <div className="admin-card__head">
          <div className="admin-card__title">Ajustes / Redes</div>
        </div>

        <form onSubmit={submit} className="form-grid">
          <div className="form-group form-group--full">
            <label className="form-label">WhatsApp (solo números, con código de país)</label>
            <input className="form-input" placeholder="595982137690" value={form.whatsapp || ''} onChange={(e) => setField('whatsapp', e.target.value)} />
            <span className="form-hint">Ej: 595982137690. Se usa en el botón flotante y en "Reservar".</span>
          </div>
          <div className="form-group form-group--full">
            <label className="form-label">Instagram (URL completa)</label>
            <input className="form-input" placeholder="https://instagram.com/tucuenta" value={form.instagram_url || ''} onChange={(e) => setField('instagram_url', e.target.value)} />
            <span className="form-hint">Dejá vacío si todavía no tenés cuenta: el link no aparecerá en la web.</span>
          </div>
          <div className="form-group form-group--full">
            <label className="form-label">Facebook (URL completa)</label>
            <input className="form-input" placeholder="https://facebook.com/tupagina" value={form.facebook_url || ''} onChange={(e) => setField('facebook_url', e.target.value)} />
          </div>
          <div className="form-group form-group--full">
            <label className="form-label">TikTok (URL completa)</label>
            <input className="form-input" placeholder="https://tiktok.com/@tucuenta" value={form.tiktok_url || ''} onChange={(e) => setField('tiktok_url', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Email de contacto</label>
            <input className="form-input" type="email" placeholder="hola@dalida.com" value={form.email || ''} onChange={(e) => setField('email', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Dirección / ubicación</label>
            <input className="form-input" placeholder="Asunción, Paraguay" value={form.direccion || ''} onChange={(e) => setField('direccion', e.target.value)} />
          </div>
          <div className="form-group form-group--full" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16 }}>
            {flash && <span style={{ color: '#2e7d5b', fontSize: '.9rem', fontWeight: 600 }}>✓ {flash}</span>}
            <button type="submit" className="btn btn--primary btn--sm" disabled={saving}>
              {saving ? 'Guardando…' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
