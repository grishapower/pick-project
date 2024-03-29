import { Task } from "@pickem/shared";
import { z } from "zod";
import { countAnswersAndPoints } from "../helpers/count-answer-and-points";
import { countTaskProgres } from "../helpers/countTaskProgres";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const tasksRouter = createTRPCRouter({
  getTournamentTasks: publicProcedure
    .input(
      z.object({
        tournamentId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { supabase, session } = ctx;

      const userId = session?.userId;

      const { data: bracketsData } = await supabase
        .from("brackets")
        .select()
        .eq("tournament_id", input.tournamentId);

      const { data: stagesData } = await supabase
        .from("stages")
        .select()
        .eq("tournament_id", input.tournamentId);

      let userData: any;
      if (userId) {
        const { data, error } = await supabase
          .from("pickems")
          .select()
          .eq("user_id", userId)
          .eq("tournament_id", input.tournamentId)
          .single();
        userData = data;
      }

      const { data: correctAnswers } = await supabase
        .from("correct_answers")
        .select()
        .eq("tournament_id", input.tournamentId)
        .single();

      const { data: tasksData } = await supabase
        .from("tournament_tasks")
        .select()
        .eq("tournament_id", input.tournamentId);

      let countedAnswer = countAnswersAndPoints(
        bracketsData!,
        userData,
        correctAnswers?.answers_data,
      );

      const newTasksData = tasksData?.map((task) => {
        const countedProgress = countTaskProgres(
          task.type,
          countedAnswer.answers?.[task?.stage_id]?.right || 0,
          {
            stageId: task.stage_id,
            userAnswers: userData || {},
            correctAnswers: correctAnswers?.answers_data,
          },
        );

        return {
          taskType: task.type,
          stageId: task.stage_id,
          ...countedProgress,
        };
      });

      return newTasksData?.sort((a, b) => {
        const aPosition =
          stagesData?.find((i) => i.id === a.stageId)?.stage_order || 0;
        const bPosition =
          stagesData?.find((i) => i.id === b.stageId)?.stage_order || 0;

        return aPosition - bPosition;
      }) as Task[];
    }),
});
