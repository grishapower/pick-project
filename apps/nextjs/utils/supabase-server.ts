//THINK ABOUT IT
import type { Database } from "@pickem/shared";
import { createClient } from "@supabase/supabase-js";

export const supabaseServer = createClient<Database>(
  process.env.NEXT_PRIVATE_SUPABASE_URL!,
  process.env.NEXT_PRIVATE_SUPABASE_ANON_KEY!,
);
