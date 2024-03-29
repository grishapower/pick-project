import { Database, INITIAL_MEDAL_LEVEL } from "@pickem/shared";
import { SupabaseClient } from "@supabase/supabase-js";

export const createPickemIfDoesntExits = async (
  tournamentId: string,
  userId: string,
  supabase: SupabaseClient<Database>,
) => {
  const record = await supabase
    .from("pickems")
    .select()
    .eq("tournament_id", tournamentId)
    .eq("user_id", userId)
    .select()
    .single();

  if (!record.data) {
    //так же нам надо добавить медаль при создании пикема
    //по хорошему это вынести в тригеры бд
    await supabase
      .from("user_medals")
      .insert({
        user_id: userId,
        tournament_id: tournamentId,
        level: INITIAL_MEDAL_LEVEL,
      })
      .select()
      .single();

    //пикем создается при первом сохранении
    return await supabase
      .from("pickems")
      .insert({
        user_id: userId,
        tournament_id: tournamentId,
      })
      .select()
      .single();
  }

  return record;
};
