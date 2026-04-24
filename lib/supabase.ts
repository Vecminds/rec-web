import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Browser-side warning only.
  // Supabase in this project is mainly for infra features like Storage.
  if (typeof window !== "undefined") {
    console.warn(
      "Supabase environment variables are not set. Storage-related features may not work."
    );
  }
}

export const supabase = createClient(
  supabaseUrl ?? "https://placeholder.supabase.co",
  supabaseAnonKey ?? "placeholder-key"
);
