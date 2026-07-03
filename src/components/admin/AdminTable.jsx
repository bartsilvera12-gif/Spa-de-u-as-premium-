export default function AdminTable({ columns, rows, empty = 'No hay registros.' }) {
  if (!rows || rows.length === 0) {
    return <div className="state"><div className="state__title">Sin resultados</div><p>{empty}</p></div>
  }
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>{columns.map((c) => <th key={c.key} style={c.style}>{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((c) => (
                <td key={c.key} className={c.key === 'actions' ? 'actions' : ''}>
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
