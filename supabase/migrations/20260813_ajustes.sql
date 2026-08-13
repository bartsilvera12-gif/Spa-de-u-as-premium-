-- ============================================================
-- Tabla de AJUSTES generales (redes sociales + contacto).
-- Fila única (id = 1). Ejecutar en Supabase Studio > SQL Editor.
-- ============================================================

create table if not exists spanails.ajustes (
  id            smallint primary key default 1,
  whatsapp      text,
  instagram_url text,
  facebook_url  text,
  tiktok_url    text,
  email         text,
  direccion     text,
  updated_at    timestamptz default now(),
  constraint ajustes_single_row check (id = 1)
);

-- Fila inicial (WhatsApp actual; Instagram vacío porque todavía no hay cuenta)
insert into spanails.ajustes (id, whatsapp, instagram_url, facebook_url, tiktok_url, email, direccion)
values (1, '595982137690', null, null, null, null, 'Asunción, Paraguay')
on conflict (id) do nothing;

alter table spanails.ajustes enable row level security;

-- Cualquiera puede leer los ajustes (son datos públicos: redes, contacto)
drop policy if exists "Public can read ajustes" on spanails.ajustes;
create policy "Public can read ajustes"
on spanails.ajustes
for select
using (true);

-- Solo los admins pueden editarlos
drop policy if exists "Admins can manage ajustes" on spanails.ajustes;
create policy "Admins can manage ajustes"
on spanails.ajustes
for all
using (spanails.is_admin())
with check (spanails.is_admin());

select * from spanails.ajustes;
