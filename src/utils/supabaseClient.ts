import { createClient } from "@supabase/supabase-js";

// Use placeholder values if environment variables are not provided at build time 
// to prevent Next.js static prerendering compilation from crashing.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn(
    "Supabase environment variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are missing. Using placeholders for compilation."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
