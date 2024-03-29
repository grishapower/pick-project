import { Stage } from "@pickem/shared";
import { z } from "zod";
import { getStageStatusByTime } from "../helpers/functions";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const stagesRouter = createTRPCRouter({
  getAllStagesByTournamentId: publicProcedure
    .input(z.object({ tournamentId: z.string(), locale: z.string() }))
    .query(async ({ input, ctx }) => {
      const { supabase } = ctx;

      const isLocaleEn = input.locale === "en";

      const { data, error } = await supabase
        .from("stages")
        .select()
        .eq("tournament_id", input.tournamentId);

      if (!data) return [];

      return data
        .map((stage) => {
          let stageStatus = getStageStatusByTime(
            stage.start_date!,
            stage.end_date!,
          );

          return {
            id: stage.id,
            end_date: stage.end_date,
            start_date: stage.start_date,
            stageOrder: stage.stage_order,
            name: isLocaleEn ? stage.name_en : stage.name,
            teams: stage.teams,
            type: stage.type,
            stageGroup: stage.stage_group,
            stageIcon: stage.icon,
            stageStatus,
          };
        })
        .sort((a, b) => a.stageOrder - b.stageOrder) as Stage[];
    }),

  //todo remove it. used only for admin panel
  getFullRecordByTournamentId: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const { supabase } = ctx;
      const { data, error } = await supabase
        .from("stages")
        .select()
        .eq("tournament_id", input);

      if (!data) return [];

      return data.map((stage) => {
        let stageStatus = getStageStatusByTime(
          stage.start_date!,
          stage.end_date!,
        );

        return {
          ...stage,
          stageStatus,
        };
      });
    }),
});
