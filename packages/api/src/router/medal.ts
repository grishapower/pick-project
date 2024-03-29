import { Medal } from "@pickem/shared";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const medalRouter = createTRPCRouter({
  getTournamentMedal: publicProcedure
    .input(
      z.object({
        tournamentId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { supabase, session } = ctx;
      const { tournamentId } = input;

      const userId = session?.userId;

      const { data: medalData } = await supabase
        .from("tournament_medal")
        .select()
        .eq("tournament_id", tournamentId)
        .single();

      let userMedalData;
      if (userId) {
        const { data } = await supabase
          .from("user_medals")
          .select()
          .eq("tournament_id", tournamentId)
          .eq("user_id", userId)
          .single();
        userMedalData = data;
      }

      return {
        imgName: medalData?.img_name || "",
        level: userMedalData?.level,
        text: medalData?.text,
        title: medalData?.title,
      } as Medal;
    }),
});
