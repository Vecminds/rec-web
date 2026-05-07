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
 * Server-side Supabase client using the service role key.
 * This client bypasses Row Level Security (RLS).
 * Use this securely in server-side API routes for infrastructure operations
 * like file uploads that should not be accessible to anonymous clients.
 */
export function createAdminSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set."
    );
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey);
}
