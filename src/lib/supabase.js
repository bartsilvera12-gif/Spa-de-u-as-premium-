import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabaseSchema = import.meta.env.VITE_SUPABASE_SCHEMA || 'spanails'

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[supabase] Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY. La app usará datos de fallback.')
}

export const supabase = createClient(
  supabaseUrl || 'http://localhost',
  supabaseAnonKey || 'anon',
  {
    db: { schema: supabaseSchema },
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
)

export const SUPABASE_SCHEMA = supabaseSchema
export const HAS_SUPABASE = Boolean(supabaseUrl && supabaseAnonKey)
