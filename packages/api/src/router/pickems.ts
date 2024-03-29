import {
  CorrectAnswers,
  Medal,
  PickemData,
  PickemStageEnum,
  PickemStageStatusEnum,
  Prize,
  sortObjectByRoundOrder,
  Stage,
  Task,
} from "@pickem/shared";
import { z } from "zod";
import { countAnswersAndPoints } from "../helpers/count-answer-and-points";
import { countTaskProgres } from "../helpers/countTaskProgres";
import { getStageStatusByTime } from "../helpers/functions";
import { getTournamentById, getUserById } from "../helpers/functions-db";
import { createPickemIfDoesntExits } from "../helpers/functions-db/pickem/createPickem";
import { sortDataByOrderStage } from "../helpers/stageSort";
import { getSteamFriendsList } from "../helpers/steam";
import { updatePickemGroupStageScheme } from "../helpers/zodScheme/updatePickemGroupStageScheme";
import { updatePickemNominationsScheme } from "../helpers/zodScheme/updatePickemNominationsScheme";
import { updatePickemPlayoffStageScheme } from "../helpers/zodScheme/updatePickemPlayoffStageScheme";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const pickemsRouter = createTRPCRouter({
  getPickemBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
        locale: z.string(),
        region: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { supabase, session } = ctx;
      const { slug, locale, region } = input;

      const userId = session?.userId;
      const isLocaleEn = locale === "en";

      const { data: tournamentDataDb } = await supabase
        .from("tournaments")
        .select()
        .eq("slug", slug)
        .single();

      const tournamentId = tournamentDataDb?.id;
      if (!tournamentId) {
        throw new Error("Tournament doesnt exist");
      }

      const tournamentData = await getTournamentById(tournamentId, supabase);

      //данные по стадиям
      const { data: stagesDataDb, error } = await supabase
        .from("stages")
        .select()
        .eq("tournament_id", tournamentId);

      const stages = (stagesDataDb || [])
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

      //пикем юзера
      let userPickem: PickemData = {
        stages: {},
      };

      if (userId) {
        const record = await supabase
          .from("pickems")
          .select()
          .eq("user_id", userId)
          .eq("tournament_id", tournamentId)
          .single();

        if (record.data) {
          userPickem = {
            stages: record.data.stages,
          } as PickemData;
        }
      }

      //get brackets
      const { data: bracketsData } = await supabase
        .from("brackets")
        .select()
        .eq("tournament_id", tournamentId);
      const brackets = (bracketsData || []).map((i) => ({
        bracket:
          i.stage_type === "PLAYOFF" //плей офф сортируем по порядку
            ? sortObjectByRoundOrder(i.bracket as any)
            : i.bracket,
        bracketType: i.bracket_type,
        stageType: i.stage_type,
      }));

      //get prizes
      const { data: prizesData } = await supabase
        .from("tournament_prizes")
        .select()
        .eq("tournament_id", tournamentId)
        .eq("region", region.toUpperCase());

      const prizes = (prizesData || [])
        ?.sort((a, b) => {
          return a.win_position_start - b.win_position_start;
        })
        .map((item) => ({
          img: item.img,
          name: item.name,
          prizeId: item.prize_id,
          type: item.type,
          winPositionStart: item.win_position_start,
          winPositionEnd: item.win_position_end,
        })) as Prize[];

      //get correct answers
      const { data: correctAnswersData } = await supabase
        .from("correct_answers")
        .select()
        .eq("tournament_id", tournamentId)
        .single();

      //get tasks data
      const { data: tasksData } = await supabase
        .from("tournament_tasks")
        .select()
        .eq("tournament_id", tournamentId);

      //refactor it
      let countedAnswer = countAnswersAndPoints(
        bracketsData!,
        userPickem,
        correctAnswersData?.answers_data,
      );

      const tasks = tasksData
        ?.map((task) => {
          const countedProgress = countTaskProgres(
            task.type,
            countedAnswer.answers?.[task?.stage_id]?.right || 0,
            {
              stageId: task.stage_id,
              userAnswers: userPickem || {},
              correctAnswers: correctAnswersData?.answers_data,
            },
          );

          return {
            taskType: task.type,
            stageId: task.stage_id,
            ...countedProgress,
          };
        })
        ?.sort((a, b) => {
          const aPosition =
            stagesDataDb?.find((i) => i.id === a.stageId)?.stage_order || 0;
          const bPosition =
            stagesDataDb?.find((i) => i.id === b.stageId)?.stage_order || 0;

          return aPosition - bPosition;
        }) as Task[];

      //get medal
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

      const medal = {
        imgName: medalData?.img_name || "",
        level: userMedalData?.level,
        text: medalData?.text,
        title: medalData?.title,
      } as Medal;

      return {
        tournament: tournamentData,
        stages,
        userPickem,
        brackets,
        prizes,
        answers: correctAnswersData?.answers_data as CorrectAnswers,
        tasks,
        medal,
      };
    }),

  getPickem: publicProcedure
    .input(
      z.object({
        tournamentId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { supabase, session } = ctx;
      const { tournamentId } = input;

      const userId = session?.userId;

      if (!userId) {
        return null;
      }

      const record = await supabase
        .from("pickems")
        .select()
        .eq("user_id", userId)
        .eq("tournament_id", tournamentId)
        .single();

      if (!record.data) {
        return null;
      }

      return {
        id: record.data.id,
        stages: record.data.stages,
      } as PickemData;
    }),

  updatePickem: protectedProcedure
    .input(
      z.object({
        tournamentId: z.string(),
        stageId: z.string(),
        data: z.any(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { supabase, session } = ctx;
      const { tournamentId, data, stageId } = input;

      const userId = session?.userId;
      if (!userId) {
        throw new Error("Unlogin");
      }

      const { data: stageData } = await supabase
        .from("stages")
        .select()
        .eq("id", stageId)
        // .eq("type", PickemStageEnum.Group)
        .single();

      if (!stageData) {
        throw new Error("Stage doesnt exists");
      }

      const isStageEnd =
        new Date(stageData.end_date).getTime() < new Date().getTime();

      if (isStageEnd) {
        throw new Error("Stage ended");
      }

      if (stageData.type === PickemStageEnum.Group) {
        const isValid = await updatePickemGroupStageScheme.safeParseAsync(data);
        if (!isValid.success) {
          throw new Error("Invalid parameters");
        }
      }

      if (stageData.type === PickemStageEnum.Nomination) {
        const isValid = await updatePickemNominationsScheme.safeParseAsync({
          nominations: data,
        });
        if (!isValid.success) {
          throw new Error("Invalid parameters");
        }
      }

      if (stageData.type === PickemStageEnum.Playoff) {
        const isValid = await updatePickemPlayoffStageScheme.safeParseAsync(
          data,
        );
        if (!isValid.success) {
          throw new Error("Invalid parameters");
        }
      }

      const { data: recordData } = await createPickemIfDoesntExits(
        tournamentId,
        userId,
        supabase,
      );

      if (!recordData) return false;

      await supabase
        .from("pickems")
        .update({
          stages: {
            ...(recordData.stages as object),
            [stageId]: data,
          },
        })
        .eq("tournament_id", tournamentId)
        .eq("user_id", userId);

      return true;
    }),

  getLeaderboard: publicProcedure
    .input(
      z.object({
        tournamentId: z.string(),
        onlyFriends: z.boolean(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { supabase, session } = ctx;
      const { tournamentId, onlyFriends } = input;
      const MAX_COUNT_PERSON = 50; //move to param maybe

      const userId = session?.userId;

      let steamFriendsIds: string[];
      if (onlyFriends && userId) {
        const user = await getUserById(userId, supabase);
        if (!user.data?.steam_id) return;
        const steamFriends = await getSteamFriendsList(user.data?.steam_id);
        steamFriendsIds = steamFriends.friendslist.friends.map(
          (i) => i.steamid,
        );
      }

      const { data, error } = await supabase
        .from("pickems")
        .select()
        .eq("tournament_id", tournamentId);

      if (error) {
        throw new Error(error.message);
      }

      //todo refactor this
      const { data: stagesData } = await supabase
        .from("stages")
        .select()
        .eq("tournament_id", tournamentId);

      const { data: bracketsData } = await supabase
        .from("brackets")
        .select()
        .eq("tournament_id", tournamentId);

      const { data: correctAnswersData } = await supabase
        .from("correct_answers")
        .select()
        .eq("tournament_id", tournamentId)
        .single();

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
          correctAnswersData?.answers_data,
        );

        const resultAnswer: {
          [x: number]: {
            all: number;
            right: number;
          };
        } = {};

        //что бы возвращаеть в ввиде 1: {} 2: {}
        stagesData?.forEach((stage) => {
          if (!stage) return;
          // stage.
          resultAnswer[stage.stage_order] = countedAnswerAndPoints.answers[
            stage.id
          ] || { all: 0, right: 0 };
        });

        resultData.push({
          userSteamId: user.data.steam_id,
          userId: user.data.id,
          userPic: user.data.user_pic,
          nickname: user.data?.nickname,
          points: countedAnswerAndPoints.points,
          answers: resultAnswer,
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

      const userData =
        sortedByPositionData[
          sortedByPositionData.findIndex((i) => i.userId === userId)
        ];

      const cuttedData = sortedByPositionData.slice(0, MAX_COUNT_PERSON);

      const resultList = onlyFriends
        ? cuttedData.filter(
            (i) =>
              steamFriendsIds.includes(i.userSteamId!) || i.userId === userId,
          )
        : cuttedData;

      //если не входит  то добавляем в ответ отдельным полем "you", что бы отобразить в топе
      const includedInResultList =
        resultList.findIndex((i) => i.userId === userId) != -1;

      return {
        you: includedInResultList ? undefined : userData,
        list: resultList,
      };
    }),
  leaderboardActive: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const { supabase } = ctx;

      const { data, error } = await supabase
        .from("stages")
        .select()
        .eq("tournament_id", input);

      const result = data?.some((i) => {
        const status = getStageStatusByTime(i.start_date!, i.end_date!);

        return status === PickemStageStatusEnum.End;
      });

      return result;
    }),

  //REFACTOR THIS 100000%
  getAllUserPickems: publicProcedure
    .input(z.object({ locale: z.string() }))
    .query(async ({ input, ctx }) => {
      const { supabase, session } = ctx;
      const { locale } = input;

      const userId = session?.userId;

      const isLocaleEn = locale === "en";
      // if (!userId) return "unlogin";
      if (!userId) return [];

      const { data: pickemData } = await supabase
        .from("pickems")
        .select()
        .eq("user_id", userId);

      //если нет пикема - возвращаем стандартные значение TODO: remove it after first release
      if (!pickemData?.length) {
        const { data: tournamentData } = await supabase
          .from("tournaments")
          .select()
          .single();

        const { data: pickemDataAllParticipants } = await supabase
          .from("pickems")
          .select()
          .eq("tournament_id", tournamentData?.id || "");

        const { data: pickemStagesData } = await supabase
          .from("stages")
          .select()
          .eq("tournament_id", tournamentData?.id || "");
        if (!pickemStagesData) return;

        let stageResult:
          | {
              name: string;
              status: PickemStageStatusEnum;
              stage: PickemStageEnum;
              time: string;
            }
          | undefined;

        sortDataByOrderStage(pickemStagesData).forEach((i) => {
          if (stageResult) return;
          const status = getStageStatusByTime(i.start_date, i.end_date);
          if (
            status === PickemStageStatusEnum.Coming ||
            status === PickemStageStatusEnum.Waiting
          ) {
            stageResult = {
              status,
              stage: i.type as PickemStageEnum,
              time:
                status === PickemStageStatusEnum.Coming
                  ? i.start_date
                  : i.end_date,
              name: isLocaleEn ? i.name_en : i.name,
            };
          }
        });
        return [
          {
            title: tournamentData?.name || "",
            position: 0,
            allParticipants: pickemDataAllParticipants?.length || 0,
            points: 0,
            stage: stageResult?.stage,
            stageName: stageResult?.name,
            stageStatus: stageResult?.status,
            time: stageResult?.time,
            userMedal: {
              level: undefined,
              img: "",
            },
          },
        ];
      }

      const result = [];
      for (let i = 0; i < pickemData.length; i++) {
        const pickem = pickemData[i];
        if (!pickem) continue;
        const tournamentId = pickem.tournament_id!;

        //todo refactor this
        const { data: bracketsData } = await supabase
          .from("brackets")
          .select()
          .eq("tournament_id", tournamentId);

        const { data: correctAnswers } = await supabase
          .from("correct_answers")
          .select()
          .eq("tournament_id", tournamentId)
          .single();

        const { data: pickemDataAllParticipants } = await supabase
          .from("pickems")
          .select()
          .eq("tournament_id", tournamentId);

        const { data: medalData } = await supabase
          .from("tournament_medal")
          .select()
          .eq("tournament_id", tournamentId)
          .single();

        const { data: tournamentData } = await supabase
          .from("tournaments")
          .select()
          .eq("id", tournamentId)
          .single();

        if (!tournamentData) {
          throw new Error();
        }

        let userMedal: {
          img?: string;
          level?: number;
        } = {
          img: medalData?.img_name,
          level: undefined,
        };

        if (userId) {
          const { data } = await supabase
            .from("user_medals")
            .select()
            .eq("tournament_id", tournamentId)
            .eq("user_id", userId)
            .single();
          if (data) {
            userMedal.level = data.level;
          }
        }

        if (!pickemDataAllParticipants) continue;

        const resultData: {
          userId: string;
          points: number;
        }[] = [];
        for (let i = 0; i < pickemDataAllParticipants.length; i++) {
          const participantPickem = pickemDataAllParticipants[i];
          if (!participantPickem?.user_id) continue;

          // const user = await getUserById(pickem.user_id, supabase);
          // if (!participantPickem.user_id) continue;
          participantPickem.user_id;
          //pass correct answers
          const countedAnswerAndPoints = countAnswersAndPoints(
            bracketsData!,
            pickem,
            correctAnswers?.answers_data,
          );
          resultData.push({
            userId: participantPickem.user_id,
            points: countedAnswerAndPoints.points,
          });
        }

        resultData.sort((a, b) => b.points - a.points);

        const userPosition = resultData.findIndex((i) => i.userId === userId);

        const { data: pickemStagesData } = await supabase
          .from("stages")
          .select()
          .eq("tournament_id", tournamentId);

        if (!pickemStagesData) return;

        let stageResult:
          | {
              status: PickemStageStatusEnum;
              stage: PickemStageEnum;
              time: string;
              name: string;
            }
          | undefined;

        sortDataByOrderStage(pickemStagesData).forEach((i) => {
          if (stageResult) return;
          const status = getStageStatusByTime(i.start_date, i.end_date);
          if (
            status === PickemStageStatusEnum.Coming ||
            status === PickemStageStatusEnum.Waiting
          ) {
            stageResult = {
              status,
              stage: i.type as PickemStageEnum,
              time:
                status === PickemStageStatusEnum.Coming
                  ? i.start_date
                  : i.end_date,
              name: isLocaleEn ? i.name_en : i.name,
            };
          }
        });

        const isLeaderboardActive = pickemStagesData?.some((i) => {
          const status = getStageStatusByTime(i.start_date, i.end_date);

          return status === PickemStageStatusEnum.End;
        });

        result.push({
          title: tournamentData.name,
          position: isLeaderboardActive ? userPosition + 1 : null,
          allParticipants: resultData.length,
          points: resultData[userPosition]?.points,
          stage: stageResult?.stage,
          stageStatus: stageResult?.status,
          stageName: stageResult?.name,
          time: stageResult?.time,
          userMedal: userMedal,
        });
      }
      return result;
    }),

  getCountUserPickems: publicProcedure.query(async ({ input, ctx }) => {
    const { supabase, session } = ctx;

    const userId = session?.userId;

    const { data: pickemData, error: pickemError } = await supabase
      .from("pickems")
      .select()
      .eq("user_id", userId);

    return pickemData?.length || 0;
  }),

  getFriendsPickem: publicProcedure.query(async ({ input, ctx }) => {
    const { supabase, session } = ctx;

    const userId = session?.userId;

    if (!userId) {
      return null;
    }

    //TODO userId
    const user = await getUserById(userId, supabase);
    if (!user.data?.steam_id) return;

    const steamFriends = await getSteamFriendsList(user.data?.steam_id);
    const steamFriendsIds = steamFriends.friendslist.friends.map(
      (i) => i.steamid,
    );

    const { data: friendsInSite } = await supabase
      .from("profiles")
      .select()
      .in("steam_id", steamFriendsIds);

    if (!friendsInSite) return [];

    const result = [];

    for (let i = 0; i < friendsInSite.length; i++) {
      const friend = friendsInSite[i];
      if (!friend) return false;

      const { data: friendPickem } = await supabase
        .from("pickems")
        .select()
        .eq("user_id", friend.id)
        .single();
      if (!friendPickem) return false;

      result.push({
        id: friend.id,
        nickname: friend.nickname,
        userPic: friend.user_pic,
        pickem: {
          id: friendPickem.id,
          stages: friendPickem.stages,
        } as PickemData,
      });
    }

    return result;
  }),
});
