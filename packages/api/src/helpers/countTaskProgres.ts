import { TaskTypeEnum } from "@pickem/shared";

export const countTaskProgres = (
  taskType: TaskTypeEnum,
  rightAnswer: number,
  specialAnswer?: {
    //для нахождения победителя/и уникальных задач
    stageId: string;
    userAnswers: any;
    correctAnswers: any;
  },
) => {
  if (taskType.includes("WIN")) {
    const count = taskType.split("_")?.[1];
    if (!count) return;

    const progressPercentage = (rightAnswer / +count) * 100;
    return {
      percent: progressPercentage > 100 ? 100 : progressPercentage,
      right: rightAnswer > +count ? +count : rightAnswer,
      all: +count,
      completed: rightAnswer >= +count,
    };
  }

  if (taskType === "SELECT_WINNER") {
    // const progressPercentage = (rightAnswer / 3) * 100;
    const { stageId, userAnswers, correctAnswers } = specialAnswer!;

    const userAnswer = userAnswers?.stages?.[stageId]?.winner?.pair1?.top;

    const isSelectWinnerTrue = correctAnswers?.[
      stageId
    ]?.winner?.pair1?.includes(userAnswer?.id);

    return {
      percent: isSelectWinnerTrue ? 100 : 0,
      right: isSelectWinnerTrue ? 1 : 0,
      all: 1,
      completed: isSelectWinnerTrue,
    };
  }

  return {
    percent: 0,
    right: 0,
    all: 0,
    completed: false,
  };
};
