import { TaskTypeEnum } from "@pickem/shared";

export const generateTaskText = (taskType: TaskTypeEnum) => {
  const textByType = {
    WIN_5: `pickem.mainTaskText`, //return translation key
    WIN_7: `pickem.mainTaskText`, //return translation key
    SELECT_WINNER: "pickem.mainTaskTextWinner",
  };

  return textByType[taskType];
};
