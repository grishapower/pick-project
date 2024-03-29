import { Prize } from "@pickem/shared";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const prizesRouter = createTRPCRouter({
  getSkinPrizesByTournamentId: publicProcedure
    .input(z.object({ tournamentId: z.string(), region: z.string() }))
    .query(async ({ input, ctx }) => {
      const { supabase } = ctx;
      const { tournamentId, region } = input;

      const { data } = await supabase
        .from("tournament_prizes")
        .select()
        .eq("tournament_id", tournamentId)
        .eq("region", region.toUpperCase());

      const result = (data || [])?.sort((a, b) => {
        return a.win_position_start - b.win_position_start;
      });

      return result.map((item) => ({
        img: item.img,
        name: item.name,
        prizeId: item.prize_id,
        type: item.type,
        winPositionStart: item.win_position_start,
        winPositionEnd: item.win_position_end,
      })) as Prize[];
    }),
});
