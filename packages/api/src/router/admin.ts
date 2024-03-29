import {
  BRACKET_BY_ENUM,
  INITIAL_MEDAL_LEVEL,
  PickemStageEnum,
  PickemStageStatusEnum,
} from "@pickem/shared";
import dayjs from "dayjs";
import { z } from "zod";

import {
  ANSWERS_EXAMPLE_SWISS,
  BRACKET_NEXT_STAGE,
} from "../constants/correctAnswersExample";
import { TEST_USERS } from "../constants/test-users";
import { countAnswersAndPoints } from "../helpers/count-answer-and-points";
import { countTaskProgres } from "../helpers/countTaskProgres";
import { getStageStatusByTime } from "../helpers/functions";
import { getUserById } from "../helpers/functions-db";
import { sortDataByOrderStage } from "../helpers/stageSort";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const adminRouter = createTRPCRouter({
  //TOURNAMENTS
  getAllTournaments: publicProcedure.query(async ({ input, ctx }) => {
    const { supabase } = ctx;

    const { data: tournamentsList } = await supabase
      .from("tournaments")
      .select();
    if (!tournamentsList) return;

    const result = [];

    for (let i = 0; i < tournamentsList.length; i++) {
      const tournament = tournamentsList[i];
      if (!tournament) continue;

      const { data: pickems } = await supabase
        .from("pickems")
        .select()
        .eq("tournament_id", tournament.id);

      const { data: pickemStagesData } = await supabase
        .from("stages")
        .select()
        .eq("tournament_id", tournament.id);

      const { data: answers } = await supabase
        .from("correct_answers")
        .select()
        .eq("tournament_id", tournament.id)
        .single();

      if (!pickemStagesData) return;

      let stageResult: {
        status: PickemStageStatusEnum;
        stage: PickemStageEnum;
        time: string;
        name: string;
      }[] = [];

      sortDataByOrderStage(pickemStagesData).forEach((i) => {
        // if (stageResult) return;
        const status = getStageStatusByTime(i.start_date, i.end_date);
        stageResult.push({
          status,
          name: i.name,
          stage: i.type as PickemStageEnum,
          time:
            status === PickemStageStatusEnum.Coming ? i.start_date : i.end_date,
        });
      });

      result.push({
        endData: tournament.end_date,
        fullName: tournament.full_name,
        id: tournament.id,
        // img: string;
        // league_id_api: number;
        name: tournament.name,
        // serie_id_api: number;
        // slug: string;
        startDate: tournament.start_date,
        participants: pickems?.length || 0,
        stages: stageResult,
        answers: answers?.answers_data,
      });
    }

    return result;
  }),

  //CONTROL TOURNAMENTS
  resetPickem: publicProcedure
    .input(z.object({ userId: z.string(), tournamentId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { supabase } = ctx;

      await supabase.from("pickems").delete().eq("user_id", input.userId);

      await supabase
        .from("stages")
        .update({
          start_date: dayjs(new Date()).add(3, "day").format("YYYY-MM-DD"),
          end_date: dayjs(new Date()).add(5, "day").format("YYYY-MM-DD"),
        })
        .eq("tournament_id", input.tournamentId)
        .eq("type", "GROUP");

      await supabase
        .from("stages")
        .update({
          start_date: dayjs(new Date()).add(8, "day").format("YYYY-MM-DD"),
          end_date: dayjs(new Date()).add(10, "day").format("YYYY-MM-DD"),
        })
        .eq("tournament_id", input.tournamentId)
        .eq("type", "PLAYOFF");

      return true;
    }),

  startBeforeTournament: publicProcedure
    .input(z.object({ tournamentId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { supabase } = ctx;

      await supabase
        .from("stages")
        .update({
          start_date: dayjs(new Date()).add(2, "day").format("YYYY-MM-DD"),
          end_date: dayjs(new Date()).add(4, "day").format("YYYY-MM-DD"),
        })
        .eq("tournament_id", input.tournamentId)
        .eq("stage_order", 1);

      await supabase
        .from("stages")
        .update({
          start_date: dayjs(new Date()).add(2, "day").format("YYYY-MM-DD"),
          end_date: dayjs(new Date()).add(4, "day").format("YYYY-MM-DD"),
        })
        .eq("tournament_id", input.tournamentId)
        .eq("stage_order", 2);

      await supabase
        .from("stages")
        .update({
          start_date: dayjs(new Date()).add(6, "day").format("YYYY-MM-DD"),
          end_date: dayjs(new Date()).add(9, "day").format("YYYY-MM-DD"),
        })
        .eq("tournament_id", input.tournamentId)
        .eq("stage_order", 3);

      await supabase
        .from("stages")
        .update({
          start_date: dayjs(new Date()).add(10, "day").format("YYYY-MM-DD"),
          end_date: dayjs(new Date()).add(14, "day").format("YYYY-MM-DD"),
        })
        .eq("tournament_id", input.tournamentId)
        .eq("stage_order", 4);

      await supabase
        .from("brackets")
        .update({
          bracket: BRACKET_BY_ENUM.NOMINATION.NOMINATION_1,
        })
        .eq("stage_type", "NOMINATION")
        .eq("tournament_id", input.tournamentId);

      await supabase
        .from("brackets")
        .update({
          bracket: BRACKET_BY_ENUM.GROUP.GROUP_SWISS_1,
        })
        .eq("stage_type", "GROUP");

      await supabase
        .from("brackets")
        .update({
          // bracket: DEFAULT_PLAYOFF_STAGE,
          bracket: BRACKET_BY_ENUM.PLAYOFF.PLAYOFF_SINGLE_ELIMINATION_1,
        })
        .eq("tournament_id", input.tournamentId)
        .eq("stage_type", "PLAYOFF");

      return true;
    }),

  startLastQualStage: publicProcedure
    .input(z.object({ tournamentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { supabase } = ctx;

      await supabase
        .from("stages")
        .update({
          start_date: dayjs(new Date()).add(-1, "day").format("YYYY-MM-DD"),
          end_date: dayjs(new Date()).add(4, "day").format("YYYY-MM-DD"),
        })
        .eq("tournament_id", input.tournamentId)
        .eq("type", "GROUP")
        .eq("stage_order", 1);

      await supabase
        .from("stages")
        .update({
          start_date: dayjs(new Date()).add(5, "day").format("YYYY-MM-DD"),
          end_date: dayjs(new Date()).add(8, "day").format("YYYY-MM-DD"),
        })
        .eq("tournament_id", input.tournamentId)
        .eq("type", "NOMINATION")
        .eq("stage_order", 2);

      await supabase
        .from("stages")
        .update({
          start_date: dayjs(new Date()).add(5, "day").format("YYYY-MM-DD"),
          end_date: dayjs(new Date()).add(8, "day").format("YYYY-MM-DD"),
        })
        .eq("tournament_id", input.tournamentId)
        .eq("type", "GROUP")
        .eq("stage_order", 3);

      await supabase
        .from("stages")
        .update({
          start_date: dayjs(new Date()).add(8, "day").format("YYYY-MM-DD"),
          end_date: dayjs(new Date()).add(13, "day").format("YYYY-MM-DD"),
        })
        .eq("tournament_id", input.tournamentId)
        .eq("type", "PLAYOFF");

      return true;
    }),

  startGroupStage: publicProcedure
    .input(z.object({ tournamentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { supabase } = ctx;

      await supabase
        .from("stages")
        .update({
          start_date: dayjs(new Date()).add(-3, "day").format("YYYY-MM-DD"),
          end_date: dayjs(new Date()).add(-2, "day").format("YYYY-MM-DD"),
        })
        .eq("tournament_id", input.tournamentId)
        .eq("type", "GROUP")
        .eq("stage_order", 1);

      await supabase
        .from("stages")
        .update({
          start_date: dayjs(new Date()).add(-1, "day").format("YYYY-MM-DD"),
          end_date: dayjs(new Date()).add(3, "day").format("YYYY-MM-DD"),
        })
        .eq("tournament_id", input.tournamentId)
        .eq("type", "NOMINATION")
        .eq("stage_order", 2);

      await supabase
        .from("stages")
        .update({
          start_date: dayjs(new Date()).add(-1, "day").format("YYYY-MM-DD"),
          end_date: dayjs(new Date()).add(3, "day").format("YYYY-MM-DD"),
        })
        .eq("tournament_id", input.tournamentId)
        .eq("type", "GROUP")
        .eq("stage_order", 3);

      await supabase
        .from("stages")
        .update({
          start_date: dayjs(new Date()).add(5, "day").format("YYYY-MM-DD"),
          end_date: dayjs(new Date()).add(8, "day").format("YYYY-MM-DD"),
        })
        .eq("tournament_id", input.tournamentId)
        .eq("type", "PLAYOFF");

      //ADD CORRECT ANSWERS HERE
      return true;
    }),

  endGroupStage: publicProcedure
    .input(z.object({ tournamentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { supabase } = ctx;

      await supabase
        .from("stages")
        .update({
          start_date: dayjs(new Date()).add(-4, "day").format("YYYY-MM-DD"),
          end_date: dayjs(new Date()).add(-3, "day").format("YYYY-MM-DD"),
        })
        .eq("tournament_id", input.tournamentId)
        .eq("type", "GROUP")
        .eq("stage_order", 1);

      await supabase
        .from("stages")
        .update({
          start_date: dayjs(new Date()).add(-4, "day").format("YYYY-MM-DD"),
          end_date: dayjs(new Date()).add(-3, "day").format("YYYY-MM-DD"),
        })
        .eq("tournament_id", input.tournamentId)
        .eq("type", "NOMINATION")
        .eq("stage_order", 2);

      await supabase
        .from("stages")
        .update({
          start_date: dayjs(new Date()).add(-2, "day").format("YYYY-MM-DD"),
          end_date: dayjs(new Date()).add(-1, "day").format("YYYY-MM-DD"),
        })
        .eq("tournament_id", input.tournamentId)
        .eq("type", "GROUP")
        .eq("stage_order", 3);

      await supabase
        .from("stages")
        .update({
          start_date: dayjs(new Date()).add(3, "day").format("YYYY-MM-DD"),
          end_date: dayjs(new Date()).add(7, "day").format("YYYY-MM-DD"),
        })
        .eq("tournament_id", input.tournamentId)
        .eq("type", "PLAYOFF");

      await supabase
        .from("brackets")
        .update({
          bracket: BRACKET_NEXT_STAGE,
        })
        .eq("stage_type", "PLAYOFF")
        .eq("tournament_id", input.tournamentId);

      return true;
    }),

  startPlayoffStage: publicProcedure
    .input(z.object({ tournamentId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { supabase } = ctx;

      await supabase
        .from("stages")
        .update({
          start_date: dayjs(new Date()).add(-4, "day").format("YYYY-MM-DD"),
          end_date: dayjs(new Date()).add(-3, "day").format("YYYY-MM-DD"),
        })
        .eq("tournament_id", input.tournamentId)
        .eq("type", "NOMINATION");

      await supabase
        .from("stages")
        .update({
          start_date: dayjs(new Date()).add(-4, "day").format("YYYY-MM-DD"),
          end_date: dayjs(new Date()).add(-3, "day").format("YYYY-MM-DD"),
        })
        .eq("tournament_id", input.tournamentId)
        .eq("type", "GROUP");

      await supabase
        .from("stages")
        .update({
          start_date: dayjs(new Date()).add(-1, "day").format("YYYY-MM-DD"),
          end_date: dayjs(new Date()).add(2, "day").format("YYYY-MM-DD"),
        })
        .eq("tournament_id", input.tournamentId)
        .eq("type", "PLAYOFF");

      return true;
    }),

  endPlayoffStage: publicProcedure
    .input(z.object({ tournamentId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { supabase } = ctx;

      await supabase
        .from("stages")
        .update({
          start_date: dayjs(new Date()).add(-4, "day").format("YYYY-MM-DD"),
          end_date: dayjs(new Date()).add(-3, "day").format("YYYY-MM-DD"),
        })
        .eq("tournament_id", input.tournamentId)
        .eq("type", "NOMINATION");

      await supabase
        .from("stages")
        .update({
          start_date: dayjs(new Date()).add(-4, "day").format("YYYY-MM-DD"),
          end_date: dayjs(new Date()).add(-3, "day").format("YYYY-MM-DD"),
        })
        .eq("tournament_id", input.tournamentId)
        .eq("type", "GROUP");

      await supabase
        .from("stages")
        .update({
          start_date: dayjs(new Date()).add(-2, "day").format("YYYY-MM-DD"),
          end_date: dayjs(new Date()).add(-1, "day").format("YYYY-MM-DD"),
        })
        .eq("tournament_id", input.tournamentId)
        .eq("type", "PLAYOFF");

      return true;
    }),

  //doesnt matter cuz admin panel
  addTournamentDB: publicProcedure
    .input(z.object({ data: z.any() }))
    .mutation(async ({ input, ctx }) => {
      const { supabase } = ctx;

      const { data } = await supabase
        .from("tournaments")
        .select()
        .eq("serie_id_api", input.data.serie_id_api)
        .single();

      if (!!data) {
        throw new Error("Такой турнир уже существует");
      }

      await supabase.from("tournaments").insert(input.data);

      return true;
    }),

  addStageByTournamentDB: publicProcedure
    .input(z.object({ data: z.any() }))
    .mutation(async ({ input, ctx }) => {
      const { supabase } = ctx;

      const { data: tournamentFromDB } = await supabase
        .from("tournaments")
        .select()
        .eq("id", input.data.tournament_id)
        .single();

      if (!tournamentFromDB) {
        throw Error("tournament doesnt exist");
      }

      delete input.data.stageStatus;

      await supabase
        .from("stages")
        .upsert(input.data, { onConflict: "stage_id_api" });

      return true;
    }),

  updateInfoTournament: publicProcedure
    .input(z.object({ tournamentId: z.string(), data: z.any() }))
    .mutation(async ({ input, ctx }) => {
      const { supabase } = ctx;

      const { data, tournamentId } = input;
      await supabase.from("tournaments").update(data).eq("id", tournamentId);

      return "ok";
    }),

  updateBracketStage: publicProcedure
    .input(z.object({ tournamentId: z.string(), data: z.any() }))
    .mutation(async ({ input, ctx }) => {
      const { supabase } = ctx;
      const { data, tournamentId } = input;

      const rowExists = await supabase
        .from("brackets")
        .select()
        .eq("tournament_id", tournamentId)
        .eq("stage_type", data.stageType)
        .single();

      if (!!rowExists.data) {
        await supabase
          .from("brackets")
          .update({
            tournament_id: input.tournamentId,
            bracket: data.bracket,
            bracket_type: data.bracketType,
            stage_type: data.stageType,
          })
          .eq("tournament_id", tournamentId)
          .eq("stage_type", data.stageType);
      } else {
        //@ts-ignore
        await supabase.from("brackets").insert({
          tournament_id: input.tournamentId,
          bracket: data.bracket,
          bracket_type: data.bracketType,
          stage_type: data.stageType,
        });
      }

      return "ok";
    }),

  addPrizeSkinTournament: publicProcedure
    .input(
      z.object({
        tournamentId: z.string(),
        data: z.any(),
        region: z.enum(["RU", "EN"]).optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { supabase } = ctx;

      const { data, tournamentId, region } = input;

      await supabase.from("tournament_prizes").insert({
        tournament_id: tournamentId,
        region,
        img: data.img,
        name: data.name,
        prize_id: data.prizeId,
        win_position_start: data.winPositionStart,
        win_position_end: data.endPositionEnd,
        type: data.type,
        // ...data,
      });

      return "ok";
    }),

  removePrizeSkinTournament: publicProcedure
    .input(
      z.object({
        tournamentId: z.string(),
        prizeId: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { supabase } = ctx;

      const { prizeId, tournamentId } = input;

      await supabase
        .from("tournament_prizes")
        .delete()
        .eq("prize_id", prizeId)
        .eq("tournament_id", tournamentId);

      return "ok";
    }),

  updateAnswersTournament: publicProcedure
    .input(z.object({ tournamentId: z.string(), data: z.any() }))
    .mutation(async ({ input, ctx }) => {
      const { supabase } = ctx;

      const { data, tournamentId } = input;

      await supabase.from("correct_answers").upsert(
        {
          tournament_id: tournamentId,
          answers_data: data,
        },
        { onConflict: "tournament_id" },
      );

      return "ok";
    }),

  addTestUserPickem: publicProcedure
    .input(z.object({ tournamentId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { supabase } = ctx;
      const { tournamentId } = input;

      for (let i = 0; i < TEST_USERS.length; i++) {
        const user = TEST_USERS[i];

        await supabase.from("profiles").upsert(
          {
            nickname: user?.nickname,
            steam_data: user?.steam_data,
            user_pic: user?.user_pic,
            steam_id: user?.steam_id,
          },
          { onConflict: "steam_id" },
        );

        const usersfromdb = await supabase
          .from("profiles")
          .select()
          .in("nickname", [
            "TEST_USER_1",
            "TEST_USER_2",
            "TEST_USER_3",
            "TEST_USER_4",
            "TEST_USER_5",
            "TEST_USER_6",
          ]);

        await supabase.from("pickems").upsert({
          tournament_id: tournamentId,
          user_id:
            usersfromdb.data?.find((i) => i.nickname === user?.nickname)?.id ||
            "",
          stages: {
            ...user?.pickem,
          },
        });
      }
    }),

  removeTestUserPickem: publicProcedure
    .input(z.object({ tournamentId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { supabase } = ctx;
      const { tournamentId } = input;

      for (let i = 0; i < TEST_USERS.length; i++) {
        const user = TEST_USERS[i];

        const usersfromdb = await supabase
          .from("profiles")
          .select()
          .in("nickname", [
            "TEST_USER_1",
            "TEST_USER_2",
            "TEST_USER_3",
            "TEST_USER_4",
            "TEST_USER_5",
            "TEST_USER_6",
          ]);

        await supabase
          .from("pickems")
          .delete()
          .eq("tournament_id", tournamentId)
          .eq(
            "user_id",
            usersfromdb.data?.find((i) => i.nickname === user?.nickname)?.id!,
          );
      }
    }),

  getLeaderboardUsers: publicProcedure
    .input(z.object({ tournamentId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { supabase } = ctx;
      const { tournamentId } = input;

      const { data, error } = await supabase
        .from("pickems")
        .select()
        .eq("tournament_id", tournamentId);

      if (error) {
        throw new Error(error.message);
      }

      const { data: correctAnswers } = await supabase
        .from("correct_answers")
        .select()
        .eq("tournament_id", tournamentId)
        .single();

      //todo refactor this
      const { data: bracketsData } = await supabase
        .from("brackets")
        .select()
        .eq("tournament_id", tournamentId);

      let resultData: {
        userSteamId: string | null;
        userId: string | null;
        userPic: string | null;
        nickname: string | null;
        points: number;
        position: number;
        answers: {
          [x: number]: {
            all: number;
            right: number;
          };
        };
      }[] = [];

      for (let i = 0; i < data.length; i++) {
        const pickem = data[i];
        if (!pickem?.user_id) return false;

        const user = await getUserById(pickem.user_id, supabase);
        if (!user?.data) return false;

        //pass correct answers
        const countedAnswerAndPoints = countAnswersAndPoints(
          bracketsData!,
          pickem,
          correctAnswers?.answers_data,
        );

        resultData.push({
          userSteamId: user.data.steam_id,
          userId: user.data.id,
          userPic: user.data.user_pic,
          nickname: user.data?.nickname,
          points: countedAnswerAndPoints.points,
          answers: countedAnswerAndPoints.answers,
          position: 0,
        });
      }

      const sortedByPositionData = resultData
        .sort((a, b) => b.points - a.points)
        .map((i, idx) => {
          return {
            ...i,
            position: idx + 1,
          };
        });

      return sortedByPositionData;
    }),

  sendPrizeToUser: publicProcedure
    .input(
      z.object({
        tournamentId: z.string(),
        userId: z.string(),
        data: z.any(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { supabase } = ctx;
      const { tournamentId, userId, data } = input;

      const test = await supabase.from("inventory").insert({
        user_id: userId,
        tournament_id: tournamentId,
        isNew: true,
        used: false,
        ...data,
      });
    }),

  inserRightAnswersPickem: publicProcedure
    .input(
      z.object({
        tournamentId: z.string(),
        type: z.number().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { supabase } = ctx;
      const { tournamentId, type } = input;

      const { data: stagesData } = await supabase.from("stages").select();

      const nowAnswers = await supabase
        .from("correct_answers")
        .select()
        .eq("tournament_id", input.tournamentId)
        .single();

      if (!nowAnswers.data) return false;

      const idStage = stagesData?.find((i) => i.stage_order === type)?.id!;

      if (!type) {
        await supabase
          .from("correct_answers")
          .update({
            answers_data: {},
          })
          .eq("tournament_id", input.tournamentId);
      } else {
        await supabase
          .from("correct_answers")
          .update({
            answers_data: {
              ...(nowAnswers.data?.answers_data || ({} as any)),
              [idStage]:
                ANSWERS_EXAMPLE_SWISS[
                  type as keyof typeof ANSWERS_EXAMPLE_SWISS
                ],
            },
          })
          .eq("tournament_id", input.tournamentId);
      }

      return "ok";
    }),

  updateParticipantsMedal: publicProcedure
    .input(
      z.object({
        tournamentId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { supabase } = ctx;

      const { data: bracketsData } = await supabase
        .from("brackets")
        .select()
        .eq("tournament_id", input.tournamentId);

      const { data: usersData, error } = await supabase
        .from("pickems")
        .select()
        // .eq("user_id", input.userId)
        .eq("tournament_id", input.tournamentId);

      if (!usersData) return;

      const { data: correctAnswers } = await supabase
        .from("correct_answers")
        .select()
        .eq("tournament_id", input.tournamentId)
        .single();

      const { data: tasksData } = await supabase
        .from("tournament_tasks")
        .select()
        .eq("tournament_id", input.tournamentId);

      for (let i = 0; i < usersData.length; i++) {
        const userPickem = usersData[i];
        if (!userPickem) continue;

        let countedAnswer = countAnswersAndPoints(
          bracketsData!,
          userPickem,
          correctAnswers?.answers_data,
        );

        let completedCount = INITIAL_MEDAL_LEVEL; //INITIAL LEVEL MEDAL
        tasksData?.forEach((task) => {
          const countedProgress = countTaskProgres(
            task.type,
            countedAnswer.answers?.[task?.stage_id]?.right || 0,
            {
              stageId: task.stage_id,
              userAnswers: userPickem,
              correctAnswers: correctAnswers?.answers_data,
            },
          );

          if (countedProgress?.completed) {
            completedCount += 1;
          }
        });

        await supabase
          .from("user_medals")
          .update({
            level: completedCount,
          })
          .eq("tournament_id", input.tournamentId)
          .eq("user_id", userPickem?.user_id);
      }

      return "ok";
    }),

  //admin func
  sendTournamentUserNotifications: publicProcedure
    .input(
      z.object({
        tournamentId: z.string(),
        text: z.string(),
        title: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { supabase } = ctx;

      const { data: participants } = await supabase
        .from("pickems")
        .select()
        .eq("tournament_id", input.tournamentId);
      if (!participants) return false;

      for (let i = 0; i < participants.length; i++) {
        const participant = participants[i];

        await supabase.from("notifications").insert({
          text: input.text,
          title: input.title,
          user_id: participant?.user_id || "",
          type: "tournament",
        });
      }

      return "ok";
    }),
});
