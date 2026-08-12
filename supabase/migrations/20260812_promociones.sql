-- ============================================================
-- Restaurar la sección PROMOCIONES (borrada por la migración del catálogo)
-- Crea la categoría 'promociones' + sus combos. Idempotente.
-- Ejecutar en Supabase Studio > SQL Editor.
-- ============================================================

-- 1) Categoría promociones (SIN icono: no aparece como área en /servicios,
--    pero sí alimenta la Home y la página /promociones que buscan por slug).
insert into spanails.categorias (nombre, slug, descripcion, imagen_url, orden, activo) values
  ('Promociones', 'promociones', 'Combos y packs especiales con precio promocional.', '/promociones.jpg', 90, true)
on conflict (slug) do update set
  nombre = excluded.nombre,
  descripcion = excluded.descripcion,
  activo = true;

-- 2) Combos
with c as (select id from spanails.categorias where slug = 'promociones')
insert into spanails.servicios
  (categoria_id, nombre, slug, descripcion, duracion_min, precio, precio_anterior, precio_desde, destacado, imagen_url, orden, activo) values
  ((select id from c), 'Combo Manos + Pies',        'promo-combo-manos-pies',   'Spa completo de manos y pies en una sesión.',                     120, 150000, 180000, false, true,  '/combo-manos-pies.jpg', 1, true),
  ((select id from c), 'Semipermanente + Nail Art', 'promo-semi-nail-art',      'Semipermanente completa con nail art incluido.',                  105, 160000, 190000, false, true,  '/semi-nailart.jpg',     2, true),
  ((select id from c), 'Pack Novia',                'promo-pack-novia',         'Manicura, semipermanente y nail art para el gran día.',           150, 250000, 300000, false, true,  '/pack-novia.jpg',       3, true),
  ((select id from c), 'Pack Amigas',              'promo-pack-amigas',        'Ritual compartido para dos personas: manos + pies.',              120, 280000, 320000, false, false, '/pack-amigas.jpg',      4, true),
  ((select id from c), 'Promo mensual',            'promo-mensual',            'Promoción vigente del mes, consultá disponibilidad.',              60,  120000, null,   true,  false, '/promo-mensual.jpg',    5, true)
on conflict (slug) do update set
  categoria_id = excluded.categoria_id,
  precio = excluded.precio,
  precio_anterior = excluded.precio_anterior,
  imagen_url = excluded.imagen_url,
  activo = true;

-- 3) Verificación
select count(*) as promos from spanails.servicios s
  join spanails.categorias c on c.id = s.categoria_id
  where c.slug = 'promociones';
