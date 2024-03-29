import { Database } from "@pickem/shared";
import { SupabaseClient } from "@supabase/supabase-js";

export const getUserById = async (
  id: string,
  supabase: SupabaseClient<Database>,
) => {
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", id)
    .limit(1)
    .single();

  return { data, error };
};
