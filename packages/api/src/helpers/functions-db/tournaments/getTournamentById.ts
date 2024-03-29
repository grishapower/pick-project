import { Database } from "@pickem/shared";
import { SupabaseClient } from "@supabase/supabase-js";
import { getTournamentStatus } from "./getTournamentStatus";

export const getTournamentById = async (
  id: string,
  supabase: SupabaseClient<Database>,
) => {
  const { data, error } = await supabase
    .from("tournaments")
    .select()
    .eq("id", id)
    .single();

  if (!data) return;

  if (error) {
    throw new Error(error);
  }
  return {
    id: data.id,
    full_name: data.full_name,
    img: data.img,
    name: data.name,
    slug: data.slug,

    tournamentStatus: getTournamentStatus(data.start_date, data.end_date),
  };
};
