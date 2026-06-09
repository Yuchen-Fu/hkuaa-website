import { createClient } from '@supabase/supabase-js'

/**
 * Service-role client. Bypasses RLS.
 * ONLY use from server-side routes AFTER verifying caller permissions.
 * NEVER import from any Client Component.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
