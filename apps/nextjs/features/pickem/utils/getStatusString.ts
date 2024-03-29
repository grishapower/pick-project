import { PickemStageStatusEnum } from "@pickem/shared";

export const getStageStringByStatus = (
  stage: PickemStageStatusEnum,
  startDate: string,
  endDate: string,
) => {
  let resultText = "";
  let time = "";
  if (stage === PickemStageStatusEnum.Coming) {
    resultText = `pickem.sidebarItemOpen`; //return translation key
    time = startDate;
  }

  if (stage === PickemStageStatusEnum.Waiting) {
    resultText = `pickem.sidebarItemClose`;
    time = endDate;
  }

  if (stage === PickemStageStatusEnum.End) {
    resultText = `pickem.sidebarItemEnd`;
  }
  return { resultText, time };
};
