// Ejecuta la migración del catálogo contra la base.
// La cadena de conexión se lee de la variable de entorno DATABASE_URL
// (así la contraseña la ponés vos y nunca queda escrita en el código).
//
// Uso (PowerShell):
//   $env:DATABASE_URL="postgresql://postgres:TU_PASSWORD@187.77.247.54:6432/postgres?sslmode=disable"
//   node scripts/run-migration.mjs
//
import fs from 'fs'
import path from 'path'
import pg from 'pg'

const url = process.env.DATABASE_URL
if (!url) {
  console.error('❌ Falta la variable DATABASE_URL. Ejemplo:')
  console.error('   $env:DATABASE_URL="postgresql://postgres:TU_PASSWORD@187.77.247.54:6432/postgres?sslmode=disable"')
  process.exit(1)
}

const sqlPath = path.resolve('supabase/migrations/20260811_sync_catalogo.sql')
const sql = fs.readFileSync(sqlPath, 'utf8')

const client = new pg.Client({ connectionString: url })

try {
  console.log('→ Conectando a la base…')
  await client.connect()
  console.log('→ Ejecutando migración (esto crea columnas, carga 20 áreas + 272 servicios y borra el catálogo viejo)…')
  await client.query(sql)

  const cat = await client.query("select count(*)::int as n from spanails.categorias where icono is not null")
  const catTot = await client.query("select count(*)::int as n from spanails.categorias")
  const serv = await client.query("select count(*)::int as n from spanails.servicios")

  console.log('')
  console.log('✅ Migración aplicada correctamente.')
  console.log(`   Áreas (categorías con ícono): ${cat.rows[0].n}   (esperado: 20)`)
  console.log(`   Categorías totales:           ${catTot.rows[0].n}`)
  console.log(`   Servicios:                    ${serv.rows[0].n}   (esperado: 272)`)
  console.log('')
  console.log('Recordá CAMBIAR la contraseña de la base, ya que la compartiste en el chat.')
} catch (e) {
  console.error('❌ Error ejecutando la migración:')
  console.error('  ', e.message)
  process.exitCode = 1
} finally {
  await client.end().catch(() => {})
}
