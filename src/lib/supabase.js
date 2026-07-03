import { createClient } from '@supabase/supabase-js'

// Defaults del deploy productivo. La anon key es pública por diseño (RLS
// controla el acceso). Se pueden sobreescribir con variables de entorno
// VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY / VITE_SUPABASE_SCHEMA en Vercel.
const DEFAULT_URL = 'https://api.neura.com.py'
const DEFAULT_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzc0MTAxNDYxLCJleHAiOjE5MzE3ODE0NjF9.7_wAph8IolPMXtgfpezSwS5XR62IdD__qhqCywLDp3Q'
const DEFAULT_SCHEMA = 'spanails'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_ANON
const supabaseSchema = import.meta.env.VITE_SUPABASE_SCHEMA || DEFAULT_SCHEMA

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: { schema: supabaseSchema },
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

export const SUPABASE_SCHEMA = supabaseSchema
export const HAS_SUPABASE = true
