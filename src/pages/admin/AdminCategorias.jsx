import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Eye, EyeOff } from 'lucide-react'
import { supabase } from '../../lib/supabase.js'
import { slugify } from '../../lib/format.js'
import AdminTable from '../../components/admin/AdminTable.jsx'
import AdminModal from '../../components/admin/AdminModal.jsx'
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx'

const emptyForm = { id: null, nombre: '', slug: '', descripcion: '', imagen_url: '', icono: '', orden: 0, activo: true }

export default function AdminCategorias() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState({ open: false, mode: 'create' })
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [confirmDel, setConfirmDel] = useState(null)
  const [flash, setFlash] = useState('')
  const [err, setErr] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('categorias').select('*').order('orden', { ascending: true })
    if (error) setErr(error.message)
    setRows(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openCreate = () => {
    setForm({ ...emptyForm, orden: (rows[rows.length - 1]?.orden || 0) + 1 })
    setErrors({}); setSlugTouched(false)
    setModal({ open: true, mode: 'create' })
  }
  const openEdit = (row) => {
    setForm({ ...row })
    setErrors({}); setSlugTouched(true)
    setModal({ open: true, mode: 'edit' })
  }

  const setField = (k, v) => {
    setForm((f) => {
      const next = { ...f, [k]: v }
      if (k === 'nombre' && !slugTouched) next.slug = slugify(v)
      return next
    })
  }

  const validate = () => {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'El nombre es obligatorio'
    if (!form.slug.trim()) e.slug = 'El slug es obligatorio'
    if (Number.isNaN(Number(form.orden))) e.orden = 'Debe ser numérico'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setErr('')

    const payload = {
      nombre: form.nombre.trim(),
      slug: form.slug.trim(),
      descripcion: form.descripcion || null,
      imagen_url: form.imagen_url || null,
      icono: form.icono || null,
      orden: Number(form.orden) || 0,
      activo: !!form.activo,
    }

    let res
    if (modal.mode === 'edit') {
      res = await supabase.from('categorias').update(payload).eq('id', form.id)
    } else {
      res = await supabase.from('categorias').insert(payload)
    }
    if (res.error) { setErr(res.error.message); return }

    setModal({ open: false })
    setFlash('Categoría guardada correctamente')
    setTimeout(() => setFlash(''), 3000)
    load()
  }

  const toggleActivo = async (row) => {
    await supabase.from('categorias').update({ activo: !row.activo }).eq('id', row.id)
    load()
  }

  const move = async (row, dir) => {
    const idx = rows.findIndex((r) => r.id === row.id)
    const swap = rows[idx + dir]
    if (!swap) return
    await Promise.all([
      supabase.from('categorias').update({ orden: swap.orden }).eq('id', row.id),
      supabase.from('categorias').update({ orden: row.orden }).eq('id', swap.id),
    ])
    load()
  }

  const doDelete = async () => {
    if (!confirmDel) return
    const { error } = await supabase.from('categorias').delete().eq('id', confirmDel.id)
    setConfirmDel(null)
    if (error) { setErr(error.message); return }
    setFlash('Categoría eliminada')
    setTimeout(() => setFlash(''), 3000)
    load()
  }

  const columns = [
    { key: 'thumb', label: '', render: (r) => <div className="thumb" style={{ backgroundImage: r.imagen_url ? `url(${r.imagen_url})` : 'none' }} /> },
    { key: 'nombre', label: 'Nombre', render: (r) => (
      <>
        <div style={{ fontWeight: 500 }}>{r.nombre}</div>
        <div style={{ fontSize: '.8rem', color: 'var(--ink-soft)' }}>{r.slug}</div>
      </>
    )},
    { key: 'orden', label: 'Orden' },
    { key: 'activo', label: 'Estado', render: (r) => (
      <span className={`tag ${r.activo ? 'tag--on' : 'tag--off'}`}>{r.activo ? 'Activo' : 'Inactivo'}</span>
    )},
    { key: 'actions', label: 'Acciones', style: { textAlign: 'right' }, render: (r) => (
      <>
        <button className="icon-btn" title="Subir" onClick={() => move(r, -1)}><ArrowUp size={16} /></button>
        <button className="icon-btn" title="Bajar" onClick={() => move(r, 1)}><ArrowDown size={16} /></button>
        <button className="icon-btn" title={r.activo ? 'Desactivar' : 'Activar'} onClick={() => toggleActivo(r)}>
          {r.activo ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
        <button className="icon-btn" title="Editar" onClick={() => openEdit(r)}><Pencil size={16} /></button>
        <button className="icon-btn icon-btn--danger" title="Eliminar" onClick={() => setConfirmDel(r)}><Trash2 size={16} /></button>
      </>
    )},
  ]

  return (
    <>
      {flash && <div className="flash-success">{flash}</div>}
      {err && <div className="flash-error">{err}</div>}

      <div className="admin-card">
        <div className="admin-card__head">
          <div className="admin-card__title">Categorías</div>
          <button className="btn btn--primary btn--sm" onClick={openCreate}><Plus size={16} /> Nueva categoría</button>
        </div>
        {loading ? <div className="state"><div className="spinner" /></div>
          : <AdminTable columns={columns} rows={rows} empty="Todavía no hay categorías. Crea la primera." />}
      </div>

      <AdminModal
        open={modal.open}
        title={modal.mode === 'edit' ? 'Editar categoría' : 'Nueva categoría'}
        onClose={() => setModal({ open: false })}
        footer={
          <>
            <button className="btn btn--ghost" onClick={() => setModal({ open: false })}>Cancelar</button>
            <button className="btn btn--primary" onClick={submit}>Guardar</button>
          </>
        }
      >
        <form onSubmit={submit} className="form-grid">
          <div className="form-group form-group--full">
            <label className="form-label">Nombre *</label>
            <input className="form-input" value={form.nombre} onChange={(e) => setField('nombre', e.target.value)} />
            {errors.nombre && <div className="form-error">{errors.nombre}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">Slug *</label>
            <input className="form-input" value={form.slug}
              onChange={(e) => { setSlugTouched(true); setField('slug', e.target.value) }} />
            {errors.slug && <div className="form-error">{errors.slug}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">Orden</label>
            <input className="form-input" type="number" value={form.orden} onChange={(e) => setField('orden', e.target.value)} />
            {errors.orden && <div className="form-error">{errors.orden}</div>}
          </div>
          <div className="form-group form-group--full">
            <label className="form-label">Descripción</label>
            <textarea className="form-textarea" value={form.descripcion || ''} onChange={(e) => setField('descripcion', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Imagen URL o ruta</label>
            <input className="form-input" placeholder="/manicura-clasica.jpg" value={form.imagen_url || ''} onChange={(e) => setField('imagen_url', e.target.value)} />
            <span className="form-hint">Podés usar rutas de /public o URLs externas.</span>
          </div>
          <div className="form-group">
            <label className="form-label">Icono (opcional)</label>
            <input className="form-input" value={form.icono || ''} onChange={(e) => setField('icono', e.target.value)} />
          </div>
          {form.imagen_url && (
            <div className="form-group form-group--full">
              <label className="form-label">Vista previa</label>
              <div className="form-preview" style={{ backgroundImage: `url(${form.imagen_url})` }} />
            </div>
          )}
          <div className="form-group form-group--full">
            <label className="form-check">
              <input type="checkbox" checked={form.activo} onChange={(e) => setField('activo', e.target.checked)} />
              Categoría activa (visible en la web pública)
            </label>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog
        open={!!confirmDel}
        title="¿Eliminar categoría?"
        message={`¿Seguro que querés eliminar "${confirmDel?.nombre}"? Esta acción no se puede deshacer.`}
        onConfirm={doDelete}
        onCancel={() => setConfirmDel(null)}
      />
    </>
  )
}
