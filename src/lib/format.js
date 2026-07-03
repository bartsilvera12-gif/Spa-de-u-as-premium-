export function formatGs(value) {
  const n = Number(value || 0)
  return `Gs. ${n.toLocaleString('es-PY')}`
}

export function slugify(text = '') {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatDuracion(min) {
  const n = Number(min || 0)
  if (!n) return '—'
  if (n < 60) return `${n} min`
  const h = Math.floor(n / 60)
  const m = n % 60
  return m ? `${h} h ${m} min` : `${h} h`
}
