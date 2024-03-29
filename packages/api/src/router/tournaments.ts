import { PickemStageStatusEnum, StageTypeEnum } from "@pickem/shared";
import dayjs from "dayjs";
import { z } from "zod";
import { getTournamentStatus } from "../helpers/functions-db/tournaments/getTournamentStatus";
import { sortDataByOrderStage } from "../helpers/stageSort";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const tournamentsRouter = createTRPCRouter({
  getTournaments: publicProcedure
    .input(
      z.object({
        type: z.enum(["full", "actual", "finished"]),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { supabase, session } = ctx;
      const { type } = input;

      const { data: tournamentsDataApi, error } = await supabase
        .from("tournaments")
        .select()
        .eq("open", true);

      const tournamentsData = (tournamentsDataApi || [])?.filter((i) => {
        if (type === "full") return i;

        if (type === "finished" && new Date(i.end_date) < new Date()) {
          return i;
        }

        if (type === "actual" && new Date(i.end_date) > new Date()) {
          return i;
        }
      });

      if (error) {
        throw new Error(error?.message);
      }

      const tournamentIds = tournamentsData.map((item) => item.id);
      const participantsCountById: {
        [x: string]: { all: number };
      } = {};

      const stageDataById: {
        [x: string]: {
          stages: {
            stage: StageTypeEnum;
            status: PickemStageStatusEnum;
            time: string;
            stageName: string;
          }[];
        };
      } = {};

      const { data: pickemData, error: pickemError } = await supabase
        .from("pickems")
        .select()
        .in("tournament_id", tournamentIds);

      for (let i = 0; i < tournamentIds.length; i++) {
        const tournamentId = tournamentIds[i];
        if (!tournamentId) return;

        const { data: stagesData } = await supabase
          .from("stages")
          .select()
          .eq("tournament_id", tournamentId);

        sortDataByOrderStage(stagesData || [])?.forEach((item) => {
          if (!stageDataById[tournamentId]) {
            stageDataById[tournamentId] = {
              stages: [],
            };
          }

          const nowTime = dayjs(new Date()).unix();
          const startTime = dayjs(item.start_date).unix();
          const endTime = dayjs(item.end_date).unix();

          if (nowTime < startTime) {
            stageDataById[tournamentId]!.stages.push({
              stage: item.type!,
              status: PickemStageStatusEnum.Coming,
              time: item.start_date,
              stageName: item.name,
            });
            return;
          }
          if (nowTime > startTime && nowTime < endTime) {
            stageDataById[tournamentId]!.stages.push({
              stage: item.type!,
              status: PickemStageStatusEnum.Waiting,
              time: item.end_date,
              stageName: item.name,
            });

            return;
          }

          if (nowTime > startTime && nowTime > endTime) {
            stageDataById[tournamentId]!.stages.push({
              stage: item.type!,
              status: PickemStageStatusEnum.End,
              time: "",
              stageName: item.name,
            });

            return;
          }
        });

        participantsCountById[tournamentId] = { all: 0 };
        participantsCountById[tournamentId]!.all =
          pickemData?.filter((i) => i.tournament_id === tournamentId).length ||
          0;
      }

      const result = tournamentsData.map((item) => {
        return {
          // ...item,
          ...stageDataById[item.id],
          id: item.id,
          name: item.full_name,
          img: item.img,
          startDate: item.start_date,
          endDate: item.end_date,
          participants: participantsCountById[item.id] || {
            all: 0,
            premium: 0,
          },
        };
      });

      return result;
    }),

  //dlya shapki remove it
  getTournamentOne: publicProcedure.query(async ({ input, ctx }) => {
    const { supabase } = ctx;
    const { data, error } = await supabase
      .from("tournaments")
      .select()
      .single();

    if (!data) return;

    if (error) {
      throw new Error(error);
    }
    return {
      id: data.id,
    };
  }),

  getTournamentById: publicProcedure
    .input(z.object({ tournamentId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { supabase } = ctx;
      const { data, error } = await supabase
        .from("tournaments")
        .select()
        .eq("id", input.tournamentId)
        .single();

      if (!data) return;

      if (error) {
        throw new Error(error);
      }
      return {
        ...data,
        tournamentStatus: getTournamentStatus(data.start_date, data.end_date),
      };
    }),
});
