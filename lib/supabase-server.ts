import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client for infra features only (Storage, Auth, policies).
 * Project rule: Prisma owns table CRUD, Supabase owns platform capabilities.
 * Uses the anon key; call inside route handlers (no singleton export).
 */
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set."
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Admin server-side Supabase client using the service role key.
 * This client bypasses RLS and should ONLY be used for privileged infrastructure
 * operations (e.g., uploading files when anon uploads are restricted).
 */
export function createAdminSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set."
    );
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}
