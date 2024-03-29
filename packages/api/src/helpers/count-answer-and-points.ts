//@ts-nocheck

import { BracketTypeEnum, Json } from "@pickem/shared";
import { REWARD_POINTS } from "../constants/points";

type initialBracket = {
  bracket: Json;
  bracket_type: BracketTypeEnum;
  tournament_id: string;
  stage_id: string;
  id: string;
}[];

//todo refactor this 100%
export const countAnswersAndPoints = (
  initialBrackets: initialBracket,
  userPickem: any,
  correctAnswers: any,
) => {
  const userAnswers = userPickem?.stages;
  const result: {
    [x: string]: {
      all: number;
      right: number;
    };
  } = {};

  initialBrackets.forEach((i) => (result[i.stage_id] = { all: 0, right: 0 }));

  let countPoints = 0;

  //это удалится и переделается еще не раз, пока так
  initialBrackets.forEach((initialBracket) => {
    //count nominations
    if (initialBracket.bracket_type === "NOMINATION_1") {
      const stageId = initialBracket.stage_id;
      for (const key in initialBracket.bracket) {
        if (
          !!userAnswers &&
          !!correctAnswers &&
          userAnswers?.[stageId]?.[key] &&
          userAnswers?.[stageId]?.[key] === correctAnswers?.[stageId]?.[key]
        ) {
          countPoints += REWARD_POINTS["NOMINATION_1"]?.[key];
          result[stageId].right += 1;
        }
        result[stageId].all += 1;
      }
    }

    if (initialBracket.bracket_type === "GROUP_SWISS_1") {
      const stageId = initialBracket.stage_id;

      initialBracket.bracket?.zero?.lose?.forEach((item: any, idx: number) => {
        if (
          !!userAnswers &&
          !!correctAnswers &&
          userAnswers?.[stageId]?.zero?.lose &&
          correctAnswers?.[stageId]?.zero?.lose?.includes(
            userAnswers?.[stageId]?.zero?.lose[idx],
          )
        ) {
          countPoints += REWARD_POINTS["GROUP_SWISS_1"].threeZeroLosePoint;
          result[stageId].right += 1;
        }
        result[stageId].all += 1;
      });

      initialBracket.bracket?.zero?.win?.forEach((item: any, idx: number) => {
        if (
          !!userAnswers &&
          !!correctAnswers &&
          userAnswers?.[stageId]?.zero?.win &&
          correctAnswers?.[stageId]?.zero?.win?.includes(
            userAnswers?.[stageId]?.zero?.win?.[idx],
          )
        ) {
          countPoints += REWARD_POINTS["GROUP_SWISS_1"].threeZeroWinPoint;
          result[stageId].right += 1;
        }
        result[stageId].all += 1;
      });

      initialBracket.bracket?.listTeam?.forEach((item: any, idx: number) => {
        if (
          !!userAnswers &&
          !!correctAnswers &&
          userAnswers?.[stageId]?.zero?.win &&
          correctAnswers?.[stageId]?.listTeam?.includes(
            userAnswers?.[stageId]?.listTeam?.[idx],
          )
        ) {
          countPoints += REWARD_POINTS["GROUP_SWISS_1"]?.listTeamPoint;
          result[stageId].right += 1;
        }
        result[stageId].all += 1;
      });
    }

    if (initialBracket.bracket_type === "PLAYOFF_SINGLE_ELIMINATION_1") {
      const stageId = initialBracket.stage_id;

      for (const stageName in initialBracket.bracket) {
        Object.keys(initialBracket.bracket?.[stageName]).forEach((pairName) => {
          const correctValue =
            correctAnswers?.[stageId]?.[stageName]?.[pairName];

          Object.keys(
            initialBracket?.bracket?.[stageName]?.[pairName],
          )?.forEach((pairKey: any) => {
            const userValue =
              userAnswers?.[stageId]?.[stageName]?.[pairName]?.[pairKey];

            if (
              !!userAnswers &&
              !!correctAnswers &&
              correctValue?.includes(userValue?.id)
            ) {
              countPoints +=
                REWARD_POINTS["PLAYOFF_SINGLE_ELIMINATION_1"]?.[stageName];
              result[stageId].right += 1;
            }
          });

          result[stageId].all += 1;
        });
      }
    }
  });

  return {
    answers: { ...result },
    points: countPoints,
  };
};
