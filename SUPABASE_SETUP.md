# Supabase self-hosted — Setup para Spa de Uñas Premium

## 1. Exponer el schema `spanails` en PostgREST

En tu configuración de Supabase self-hosted (archivo `docker-compose.yml` o variables
del contenedor `rest`) asegurate de incluir `spanails` en `PGRST_DB_SCHEMAS`:

```env
PGRST_DB_SCHEMAS=public,storage,graphql_public,spanails
```

Luego reiniciá el contenedor de PostgREST:

```bash
docker compose restart rest
```

> Si no exponés el schema, el frontend recibirá `PGRST106 The schema must be one of the following...`.

## 2. Ejecutar la migración

Desde tu servidor Supabase (o cualquier equipo con `psql`):

```bash
psql "postgresql://postgres:TU_PASSWORD@187.77.247.54:6432/postgres?sslmode=disable" \
  -f supabase/migrations/20260703_spanails_admin.sql
```

Alternativas:

- **Supabase Studio** → SQL editor → pegá y ejecutá el contenido del archivo.
- **DBeaver / TablePlus** → conectá con las credenciales y ejecutá el `.sql`.

## 3. Crear el primer usuario admin

### 3.1 Crear el usuario en Auth

En Supabase Studio → Authentication → Users → **Add user**:

- Email: `admin@tudominio.com`
- Password: (elegí uno fuerte)
- Marcá "Auto-confirm user" (para saltear verificación por email).

Copiá el `user_id` (UUID) que Studio muestra.

### 3.2 Insertar el perfil admin

```sql
insert into spanails.admin_profiles (user_id, nombre, rol, activo)
values ('EL-UUID-QUE-COPIASTE', 'Alan Ayala', 'admin', true);
```

## 4. Variables de entorno del frontend

Copiá `.env.example` a `.env` y ajustá:

```env
VITE_SUPABASE_URL=https://api.neura.com.py
VITE_SUPABASE_ANON_KEY=<anon key>
VITE_SUPABASE_SCHEMA=spanails
```

## 5. Verificación rápida

```sql
-- ¿Existen las tablas?
select table_name from information_schema.tables where table_schema = 'spanails';

-- ¿Está activo tu perfil?
select * from spanails.admin_profiles;

-- ¿RLS está activa?
select relname, relrowsecurity from pg_class where relnamespace = 'spanails'::regnamespace;
```
