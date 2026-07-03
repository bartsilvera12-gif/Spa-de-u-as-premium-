-- =============================================================================
-- Spa de Uñas Premium — Admin schema
-- Schema: spanails
-- Fecha: 2026-07-03
-- =============================================================================

create schema if not exists spanails;

-- Otorgar uso del schema a los roles estándar de Supabase.
grant usage on schema spanails to anon, authenticated, service_role;
alter default privileges in schema spanails grant all on tables to anon, authenticated, service_role;
alter default privileges in schema spanails grant all on functions to anon, authenticated, service_role;
alter default privileges in schema spanails grant all on sequences to anon, authenticated, service_role;

-- Extensión para gen_random_uuid()
create extension if not exists pgcrypto;

-- =============================================================================
-- TABLA: categorias
-- =============================================================================
create table if not exists spanails.categorias (
  id           uuid primary key default gen_random_uuid(),
  nombre       text not null,
  slug         text not null unique,
  descripcion  text,
  imagen_url   text,
  icono        text,
  orden        integer not null default 0,
  activo       boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists categorias_orden_idx  on spanails.categorias (orden);
create index if not exists categorias_activo_idx on spanails.categorias (activo);

-- =============================================================================
-- TABLA: servicios
-- =============================================================================
create table if not exists spanails.servicios (
  id               uuid primary key default gen_random_uuid(),
  categoria_id     uuid references spanails.categorias(id) on delete set null,
  nombre           text not null,
  slug             text not null unique,
  descripcion      text,
  duracion_min     integer,
  precio           numeric(12,0) not null default 0,
  precio_anterior  numeric(12,0),
  precio_desde     boolean not null default false,
  destacado        boolean not null default false,
  imagen_url       text,
  orden            integer not null default 0,
  activo           boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists servicios_categoria_idx on spanails.servicios (categoria_id);
create index if not exists servicios_orden_idx     on spanails.servicios (orden);
create index if not exists servicios_activo_idx    on spanails.servicios (activo);
create index if not exists servicios_destacado_idx on spanails.servicios (destacado);

-- =============================================================================
-- TABLA: admin_profiles
-- =============================================================================
create table if not exists spanails.admin_profiles (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null unique references auth.users(id) on delete cascade,
  nombre      text,
  rol         text not null default 'admin',
  activo      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- =============================================================================
-- Trigger updated_at
-- =============================================================================
create or replace function spanails.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at_categorias on spanails.categorias;
create trigger set_updated_at_categorias
before update on spanails.categorias
for each row execute procedure spanails.set_updated_at();

drop trigger if exists set_updated_at_servicios on spanails.servicios;
create trigger set_updated_at_servicios
before update on spanails.servicios
for each row execute procedure spanails.set_updated_at();

-- =============================================================================
-- Helper: spanails.is_admin()
-- =============================================================================
create or replace function spanails.is_admin()
returns boolean
language sql
security definer
set search_path = spanails, auth, public
as $$
  select exists (
    select 1
    from spanails.admin_profiles p
    where p.user_id = auth.uid()
      and p.activo = true
  );
$$;

grant execute on function spanails.is_admin() to anon, authenticated, service_role;

-- =============================================================================
-- RLS
-- =============================================================================
alter table spanails.categorias      enable row level security;
alter table spanails.servicios       enable row level security;
alter table spanails.admin_profiles  enable row level security;

-- Lectura pública sólo de registros activos
drop policy if exists "Public can read active categories" on spanails.categorias;
create policy "Public can read active categories"
on spanails.categorias
for select
using (activo = true);

drop policy if exists "Public can read active services" on spanails.servicios;
create policy "Public can read active services"
on spanails.servicios
for select
using (activo = true);

-- Los admins pueden gestionar todo (incluye ver registros inactivos)
drop policy if exists "Admins can manage categories" on spanails.categorias;
create policy "Admins can manage categories"
on spanails.categorias
for all
using (spanails.is_admin())
with check (spanails.is_admin());

drop policy if exists "Admins can manage services" on spanails.servicios;
create policy "Admins can manage services"
on spanails.servicios
for all
using (spanails.is_admin())
with check (spanails.is_admin());

-- admin_profiles: sólo lectura del propio perfil
drop policy if exists "Admins can read own profile" on spanails.admin_profiles;
create policy "Admins can read own profile"
on spanails.admin_profiles
for select
using (user_id = auth.uid());

-- =============================================================================
-- SEED: categorías
-- =============================================================================
insert into spanails.categorias (nombre, slug, descripcion, imagen_url, icono, orden, activo) values
  ('Manicura clásica',      'manicura-clasica',      'Cuidado clásico de manos y esmaltado tradicional.',                '/manicura-clasica.jpg',      'sparkles',   1, true),
  ('Uñas semipermanentes',  'unas-semipermanentes',  'Esmaltado semipermanente de larga duración y brillo intenso.',     '/unas-semipermanentes.jpg',  'gem',        2, true),
  ('Uñas acrílicas',        'unas-esculpidas',       'Extensiones acrílicas o soft gel personalizadas.',                 '/unas-esculpidas.jpg',       'brush',      3, true),
  ('Kapping gel',           'kapping-gel',           'Refuerzo natural con gel sobre uña propia.',                       '/kapping-gel.jpg',           'shield',     4, true),
  ('Nail art',              'nail-art',              'Diseños exclusivos, pedrería y detalles a medida.',                '/nail-art.jpg',              'palette',    5, true),
  ('Spa de manos',          'spa-manos',             'Ritual de hidratación profunda y masaje para manos.',              '/spa-manos.jpg',             'hand',       6, true),
  ('Spa de pies',           'spa-pies',              'Baño relajante, exfoliación e hidratación para pies.',             '/spa-pies.jpg',              'footprints', 7, true),
  ('Promociones',           'promociones',           'Combos y packs especiales pensados para vos.',                     '/promociones.jpg',           'heart',      8, true)
on conflict (slug) do nothing;

-- =============================================================================
-- SEED: servicios
-- =============================================================================
with c as (
  select id, slug from spanails.categorias
)
insert into spanails.servicios
  (categoria_id, nombre, slug, descripcion, duracion_min, precio, precio_anterior, precio_desde, destacado, imagen_url, orden, activo)
values
  -- Manicura clásica
  ((select id from c where slug='manicura-clasica'), 'Manicura clásica',                    'manicura-clasica-servicio',       'Corte, limado, cutícula y esmaltado tradicional.',                        45,  40000,  null, false, false, '/galeria/manicura-clasica-1.jpg',      1, true),
  ((select id from c where slug='manicura-clasica'), 'Manicura express',                    'manicura-express',                'Retoque rápido de forma y esmaltado.',                                    25,  35000,  null, false, false, '/galeria/manicura-clasica-2.jpg',      2, true),
  ((select id from c where slug='manicura-clasica'), 'Manicura premium con hidratación',    'manicura-premium-hidratacion',    'Manicura completa con mascarilla hidratante y masaje.',                   60,  60000,  null, false, true,  '/galeria/manicura-clasica-3.jpg',      3, true),

  -- Semipermanentes
  ((select id from c where slug='unas-semipermanentes'), 'Esmaltado semipermanente',            'esmaltado-semipermanente',        'Esmaltado semipermanente de larga duración.',                             60,  90000,  null, false, true,  '/galeria/semipermanente-1.jpg',  1, true),
  ((select id from c where slug='unas-semipermanentes'), 'Semipermanente con diseño simple',    'semipermanente-diseno-simple',    'Semipermanente con detalles decorativos simples.',                        75, 110000,  null, false, false, '/galeria/semipermanente-2.jpg',  2, true),
  ((select id from c where slug='unas-semipermanentes'), 'Semipermanente con nail art',         'semipermanente-con-nail-art',     'Semipermanente con nail art personalizado.',                              90, 140000,  null, false, false, '/galeria/semipermanente-3.jpg',          3, true),

  -- Esculpidas
  ((select id from c where slug='unas-esculpidas'), 'Uñas acrílicas',                       'unas-acrilicas',                  'Extensiones esculpidas en acrílico.',                                     120, 170000,  null, true,  true,  '/galeria/esculpidas-1.jpg',       1, true),
  ((select id from c where slug='unas-esculpidas'), 'Uñas soft gel',                        'unas-soft-gel',                   'Extensiones en soft gel, ligeras y naturales.',                           120, 150000,  null, true,  false, '/galeria/esculpidas-2.jpg',       2, true),
  ((select id from c where slug='unas-esculpidas'), 'Relleno de uñas',                      'relleno-unas',                    'Relleno y mantenimiento de esculpidas.',                                   90, 120000,  null, true,  false, '/galeria/esculpidas-3.jpg',       3, true),
  ((select id from c where slug='unas-esculpidas'), 'Retiro de uñas',                       'retiro-unas',                     'Retiro seguro de esculpidas y acondicionamiento.',                         45,  50000,  null, false, false, '/galeria/esculpidas-4.jpg',       4, true),

  -- Kapping
  ((select id from c where slug='kapping-gel'), 'Kapping gel',                          'kapping-gel-servicio',            'Refuerzo natural con gel sobre uña propia.',                              75, 120000,  null, false, false, '/galeria/kapping-1.jpg',           1, true),
  ((select id from c where slug='kapping-gel'), 'Kapping con diseño',                   'kapping-con-diseno',              'Kapping gel con diseño decorativo.',                                      90, 150000,  null, false, false, '/galeria/kapping-2.jpg',           2, true),

  -- Spa
  ((select id from c where slug='spa-manos'), 'Spa de manos',                         'spa-de-manos',                    'Ritual completo de hidratación, exfoliación y masaje de manos.',          45,  70000,  null, false, false, '/galeria/spa-manos-1.jpg',             1, true),
  ((select id from c where slug='spa-pies'),  'Spa de pies',                          'spa-de-pies',                     'Baño relajante, exfoliación y masaje de pies.',                            60,  30000,  null, false, false, '/galeria/spa-pies-3.jpg',              1, true),

  -- Promociones
  ((select id from c where slug='promociones'), 'Combo Manos + Pies',                   'combo-manos-pies',                'Spa completo de manos y pies en una sesión.',                             120, 150000, 180000, false, true, '/combo-manos-pies.jpg',      1, true),
  ((select id from c where slug='promociones'), 'Semipermanente + Nail Art',            'semi-nail-art-combo',             'Semipermanente completa con nail art incluido.',                          105, 160000, 190000, false, true, '/semi-nailart.jpg',          2, true),
  ((select id from c where slug='promociones'), 'Pack Novia',                           'pack-novia',                      'Manicura, semipermanente y nail art para el gran día.',                   150, 250000, 300000, false, true, '/pack-novia.jpg',            3, true),
  ((select id from c where slug='promociones'), 'Pack Amigas',                          'pack-amigas',                     'Ritual compartido para dos personas: manos + pies.',                      120, 280000, 320000, false, false, '/pack-amigas.jpg',           4, true),
  ((select id from c where slug='promociones'), 'Promo mensual',                        'promo-mensual',                   'Promoción vigente del mes, consultá disponibilidad.',                      60, 120000,  null, true,  false, '/promo-mensual.jpg',         5, true)
on conflict (slug) do nothing;

-- =============================================================================
-- FIN
-- =============================================================================
