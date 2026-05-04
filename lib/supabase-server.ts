import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client for infra features only (Storage, Auth, policies).
 * Project rule: Prisma owns table CRUD, Supabase owns platform capabilities.
 * Uses the service role key; call inside route handlers (no singleton export).
 */
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set."
    );
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}
