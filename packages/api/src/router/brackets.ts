import { sortObjectByRoundOrder } from "@pickem/shared";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const bracketsRouter = createTRPCRouter({
  getBracketByTournamentId: publicProcedure
    .input(z.object({ tournamentId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { supabase } = ctx;
      const { tournamentId } = input;

      const { data } = await supabase
        .from("brackets")
        .select()
        .eq("tournament_id", tournamentId);

      if (!data) {
        return [];
      }

      return data.map((i) => ({
        bracket:
          i.stage_type === "PLAYOFF" //плей офф сортируем по порядку
            ? sortObjectByRoundOrder(i.bracket as any)
            : i.bracket,
        bracketType: i.bracket_type,
        stageType: i.stage_type,
      }));
    }),
});
