import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FolderHeart, Sparkles, Star, TrendingUp, Plus, ExternalLink } from 'lucide-react'
import { supabase } from '../../lib/supabase.js'
import { formatGs } from '../../lib/format.js'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ cats: 0, servs: 0, dest: 0, promedio: 0, ultimos: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const [cats, servs, ult] = await Promise.all([
        supabase.from('categorias').select('id', { count: 'exact', head: true }).eq('activo', true),
        supabase.from('servicios').select('id, precio, destacado', { count: 'exact' }).eq('activo', true),
        supabase.from('servicios').select('id, nombre, precio, updated_at, activo').order('updated_at', { ascending: false }).limit(5),
      ])

      const rows = servs.data || []
      const dest = rows.filter((s) => s.destacado).length
      const promedio = rows.length ? Math.round(rows.reduce((a, s) => a + Number(s.precio || 0), 0) / rows.length) : 0

      setStats({
        cats: cats.count || 0,
        servs: servs.count || 0,
        dest,
        promedio,
        ultimos: ult.data || [],
      })
      setLoading(false)
    })()
  }, [])

  if (loading) return <div className="state"><div className="spinner" /></div>

  return (
    <>
      <div className="quick-actions">
        <Link to="/admin/categorias" className="quick-action">
          <div className="quick-action__icon"><Plus size={20} /></div>
          <div>
            <div className="quick-action__label">Nueva categoría</div>
            <div className="quick-action__desc">Añadí una categoría a la carta</div>
          </div>
        </Link>
        <Link to="/admin/servicios" className="quick-action">
          <div className="quick-action__icon"><Plus size={20} /></div>
          <div>
            <div className="quick-action__label">Nuevo servicio</div>
            <div className="quick-action__desc">Cargá un servicio con precio y duración</div>
          </div>
        </Link>
        <a href="/" target="_blank" rel="noopener" className="quick-action">
          <div className="quick-action__icon"><ExternalLink size={20} /></div>
          <div>
            <div className="quick-action__label">Ver web pública</div>
            <div className="quick-action__desc">Revisá cómo se ve el sitio</div>
          </div>
        </a>
      </div>

      <div className="metric-grid">
        <div className="metric">
          <div className="metric__label"><FolderHeart size={14} style={{ display: 'inline', marginRight: 6 }} />Categorías activas</div>
          <div className="metric__value">{stats.cats}</div>
        </div>
        <div className="metric">
          <div className="metric__label"><Sparkles size={14} style={{ display: 'inline', marginRight: 6 }} />Servicios activos</div>
          <div className="metric__value">{stats.servs}</div>
        </div>
        <div className="metric">
          <div className="metric__label"><Star size={14} style={{ display: 'inline', marginRight: 6 }} />Destacados</div>
          <div className="metric__value">{stats.dest}</div>
        </div>
        <div className="metric">
          <div className="metric__label"><TrendingUp size={14} style={{ display: 'inline', marginRight: 6 }} />Precio promedio</div>
          <div className="metric__value" style={{ fontSize: '1.6rem' }}>{formatGs(stats.promedio)}</div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card__head">
          <div className="admin-card__title">Últimos servicios editados</div>
        </div>
        {stats.ultimos.length === 0 ? (
          <div className="state">
            <div className="state__title">Todavía no hay servicios</div>
            <p>Empezá creando categorías y luego servicios.</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Nombre</th><th>Precio</th><th>Estado</th><th>Actualizado</th></tr></thead>
              <tbody>
                {stats.ultimos.map((s) => (
                  <tr key={s.id}>
                    <td>{s.nombre}</td>
                    <td>{formatGs(s.precio)}</td>
                    <td><span className={`tag ${s.activo ? 'tag--on' : 'tag--off'}`}>{s.activo ? 'Activo' : 'Inactivo'}</span></td>
                    <td>{s.updated_at ? new Date(s.updated_at).toLocaleString('es-PY') : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
