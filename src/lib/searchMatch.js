// Búsqueda "inteligente" para el panel: tolera tildes, mayúsculas, signos de
// puntuación y el orden de las palabras. Cada palabra escrita debe aparecer en
// alguno de los campos del ítem (nombre, categoría, descripción, slug…), así que
// "spa pies", "pies spa" o "SPA de PIÉS" encuentran lo mismo.

export function normalize(str) {
  return (str ?? '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // saca tildes/diacríticos
    .replace(/[^a-z0-9\s]/g, ' ')    // signos de puntuación -> espacio
    .replace(/\s+/g, ' ')
    .trim()
}

export function smartMatch(query, fields) {
  const q = normalize(query)
  if (!q) return true
  const haystack = normalize((Array.isArray(fields) ? fields : [fields]).filter(Boolean).join(' '))
  // AND de palabras: todas las palabras escritas tienen que estar presentes.
  return q.split(' ').every((token) => haystack.includes(token))
}
