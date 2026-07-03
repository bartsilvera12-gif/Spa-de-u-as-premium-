import { useEffect, useMemo, useState } from 'react'
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, Star } from 'lucide-react'
import { supabase } from '../../lib/supabase.js'
import { slugify, formatGs, formatDuracion } from '../../lib/format.js'
import AdminTable from '../../components/admin/AdminTable.jsx'
import AdminModal from '../../components/admin/AdminModal.jsx'
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx'

const emptyForm = {
  id: null, categoria_id: '', nombre: '', slug: '', descripcion: '',
  duracion_min: '', precio: 0, precio_anterior: '', precio_desde: false,
  destacado: false, imagen_url: '', orden: 0, activo: true,
}

export default function AdminServicios() {
  const [rows, setRows] = useState([])
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState({ open: false, mode: 'create' })
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [confirmDel, setConfirmDel] = useState(null)
  const [flash, setFlash] = useState('')
  const [err, setErr] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)

  const [filtroCat, setFiltroCat] = useState('')
  const [busqueda, setBusqueda] = useState('')

  const load = async () => {
    setLoading(true)
    const [{ data: servs }, { data: cats }] = await Promise.all([
      supabase.from('servicios').select('*, categoria:categorias(id,nombre)').order('orden', { ascending: true }),
      supabase.from('categorias').select('id, nombre').order('orden', { ascending: true }),
    ])
    setRows(servs || [])
    setCategorias(cats || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openCreate = () => {
    setForm({ ...emptyForm, orden: (rows[rows.length - 1]?.orden || 0) + 1, categoria_id: categorias[0]?.id || '' })
    setErrors({}); setSlugTouched(false)
    setModal({ open: true, mode: 'create' })
  }
  const openEdit = (row) => {
    setForm({
      ...row,
      categoria_id: row.categoria_id || '',
      precio_anterior: row.precio_anterior || '',
      duracion_min: row.duracion_min || '',
    })
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
    if (form.precio === '' || Number.isNaN(Number(form.precio))) e.precio = 'Precio numérico obligatorio'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setErr('')

    const payload = {
      categoria_id: form.categoria_id || null,
      nombre: form.nombre.trim(),
      slug: form.slug.trim(),
      descripcion: form.descripcion || null,
      duracion_min: form.duracion_min === '' ? null : Number(form.duracion_min),
      precio: Number(form.precio) || 0,
      precio_anterior: form.precio_anterior === '' ? null : Number(form.precio_anterior),
      precio_desde: !!form.precio_desde,
      destacado: !!form.destacado,
      imagen_url: form.imagen_url || null,
      orden: Number(form.orden) || 0,
      activo: !!form.activo,
    }

    let res
    if (modal.mode === 'edit') {
      res = await supabase.from('servicios').update(payload).eq('id', form.id)
    } else {
      res = await supabase.from('servicios').insert(payload)
    }
    if (res.error) { setErr(res.error.message); return }

    setModal({ open: false })
    setFlash('Servicio guardado correctamente')
    setTimeout(() => setFlash(''), 3000)
    load()
  }

  const toggleActivo = async (row) => {
    await supabase.from('servicios').update({ activo: !row.activo }).eq('id', row.id); load()
  }
  const toggleDestacado = async (row) => {
    await supabase.from('servicios').update({ destacado: !row.destacado }).eq('id', row.id); load()
  }
  const move = async (row, dir) => {
    const list = filtered
    const idx = list.findIndex((r) => r.id === row.id)
    const swap = list[idx + dir]
    if (!swap) return
    await Promise.all([
      supabase.from('servicios').update({ orden: swap.orden }).eq('id', row.id),
      supabase.from('servicios').update({ orden: row.orden }).eq('id', swap.id),
    ])
    load()
  }
  const doDelete = async () => {
    if (!confirmDel) return
    const { error } = await supabase.from('servicios').delete().eq('id', confirmDel.id)
    setConfirmDel(null)
    if (error) { setErr(error.message); return }
    setFlash('Servicio eliminado')
    setTimeout(() => setFlash(''), 3000)
    load()
  }

  const filtered = useMemo(() => rows.filter((r) => {
    if (filtroCat && r.categoria_id !== filtroCat) return false
    if (busqueda && !r.nombre.toLowerCase().includes(busqueda.toLowerCase())) return false
    return true
  }), [rows, filtroCat, busqueda])

  const columns = [
    { key: 'thumb', label: '', render: (r) => <div className="thumb" style={{ backgroundImage: r.imagen_url ? `url(${r.imagen_url})` : 'none' }} /> },
    { key: 'nombre', label: 'Servicio', render: (r) => (
      <>
        <div style={{ fontWeight: 500 }}>{r.nombre} {r.destacado && <Star size={12} fill="var(--gold)" color="var(--gold)" style={{ marginLeft: 4 }} />}</div>
        <div style={{ fontSize: '.8rem', color: 'var(--ink-soft)' }}>{r.categoria?.nombre || '—'}</div>
      </>
    )},
    { key: 'precio', label: 'Precio', render: (r) => (
      <>
        <div>{r.precio_desde && 'Desde '}{formatGs(r.precio)}</div>
        {r.precio_anterior && <div style={{ textDecoration: 'line-through', color: 'var(--ink-soft)', fontSize: '.82rem' }}>{formatGs(r.precio_anterior)}</div>}
      </>
    )},
    { key: 'duracion', label: 'Duración', render: (r) => formatDuracion(r.duracion_min) },
    { key: 'orden', label: 'Orden' },
    { key: 'activo', label: 'Estado', render: (r) => (
      <span className={`tag ${r.activo ? 'tag--on' : 'tag--off'}`}>{r.activo ? 'Activo' : 'Inactivo'}</span>
    )},
    { key: 'actions', label: 'Acciones', style: { textAlign: 'right' }, render: (r) => (
      <>
        <button className="icon-btn" title="Subir" onClick={() => move(r, -1)}><ArrowUp size={16} /></button>
        <button className="icon-btn" title="Bajar" onClick={() => move(r, 1)}><ArrowDown size={16} /></button>
        <button className="icon-btn" title={r.destacado ? 'Quitar destacado' : 'Destacar'} onClick={() => toggleDestacado(r)}>
          <Star size={16} fill={r.destacado ? 'var(--gold)' : 'none'} color={r.destacado ? 'var(--gold)' : 'currentColor'} />
        </button>
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
          <div className="admin-card__title">Servicios</div>
          <button className="btn btn--primary btn--sm" onClick={openCreate}><Plus size={16} /> Nuevo servicio</button>
        </div>

        <div className="filters">
          <input className="form-input" placeholder="Buscar por nombre…" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
          <select className="form-select" value={filtroCat} onChange={(e) => setFiltroCat(e.target.value)}>
            <option value="">Todas las categorías</option>
            {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
        </div>

        {loading ? <div className="state"><div className="spinner" /></div>
          : <AdminTable columns={columns} rows={filtered} empty="No encontramos servicios con ese filtro." />}
      </div>

      <AdminModal
        open={modal.open}
        title={modal.mode === 'edit' ? 'Editar servicio' : 'Nuevo servicio'}
        onClose={() => setModal({ open: false })}
        footer={
          <>
            <button className="btn btn--ghost" onClick={() => setModal({ open: false })}>Cancelar</button>
            <button className="btn btn--primary" onClick={submit}>Guardar</button>
          </>
        }
      >
        <form onSubmit={submit} className="form-grid">
          <div className="form-group">
            <label className="form-label">Categoría</label>
            <select className="form-select" value={form.categoria_id || ''} onChange={(e) => setField('categoria_id', e.target.value)}>
              <option value="">— Sin categoría —</option>
              {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Orden</label>
            <input className="form-input" type="number" value={form.orden} onChange={(e) => setField('orden', e.target.value)} />
          </div>
          <div className="form-group form-group--full">
            <label className="form-label">Nombre *</label>
            <input className="form-input" value={form.nombre} onChange={(e) => setField('nombre', e.target.value)} />
            {errors.nombre && <div className="form-error">{errors.nombre}</div>}
          </div>
          <div className="form-group form-group--full">
            <label className="form-label">Slug *</label>
            <input className="form-input" value={form.slug}
              onChange={(e) => { setSlugTouched(true); setField('slug', e.target.value) }} />
            {errors.slug && <div className="form-error">{errors.slug}</div>}
          </div>
          <div className="form-group form-group--full">
            <label className="form-label">Descripción</label>
            <textarea className="form-textarea" value={form.descripcion || ''} onChange={(e) => setField('descripcion', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Duración (min)</label>
            <input className="form-input" type="number" value={form.duracion_min ?? ''} onChange={(e) => setField('duracion_min', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Precio (Gs.) *</label>
            <input className="form-input" type="number" value={form.precio} onChange={(e) => setField('precio', e.target.value)} />
            {errors.precio && <div className="form-error">{errors.precio}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">Precio anterior (Gs.)</label>
            <input className="form-input" type="number" value={form.precio_anterior ?? ''} onChange={(e) => setField('precio_anterior', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Imagen URL o ruta</label>
            <input className="form-input" placeholder="/manicura-clasica.jpg" value={form.imagen_url || ''} onChange={(e) => setField('imagen_url', e.target.value)} />
          </div>
          {form.imagen_url && (
            <div className="form-group form-group--full">
              <label className="form-label">Vista previa</label>
              <div className="form-preview" style={{ backgroundImage: `url(${form.imagen_url})` }} />
            </div>
          )}
          <div className="form-group">
            <label className="form-check">
              <input type="checkbox" checked={form.precio_desde} onChange={(e) => setField('precio_desde', e.target.checked)} />
              Mostrar como "Desde"
            </label>
          </div>
          <div className="form-group">
            <label className="form-check">
              <input type="checkbox" checked={form.destacado} onChange={(e) => setField('destacado', e.target.checked)} />
              Destacado
            </label>
          </div>
          <div className="form-group form-group--full">
            <label className="form-check">
              <input type="checkbox" checked={form.activo} onChange={(e) => setField('activo', e.target.checked)} />
              Servicio activo (visible en la web pública)
            </label>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog
        open={!!confirmDel}
        title="¿Eliminar servicio?"
        message={`¿Seguro que querés eliminar "${confirmDel?.nombre}"? Esta acción no se puede deshacer.`}
        onConfirm={doDelete}
        onCancel={() => setConfirmDel(null)}
      />
    </>
  )
}
