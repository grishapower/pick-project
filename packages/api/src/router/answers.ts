import { CorrectAnswers } from "@pickem/shared";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const answersRouter = createTRPCRouter({
  getCorrectAnswers: publicProcedure
    .input(z.object({ tournamentId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { supabase } = ctx;

      const { data, status } = await supabase
        .from("correct_answers")
        .select()
        .eq("tournament_id", input.tournamentId)
        .single();

      return data?.answers_data as CorrectAnswers;
    }),
});
