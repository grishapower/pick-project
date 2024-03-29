import { PickemStageStatusEnum } from "@pickem/shared";
import dayjs from "dayjs";

export const getStageStatusByTime = (startDate: string, endDate: string) => {
  let stageStatus = PickemStageStatusEnum.Coming;
  const nowDateUnix = dayjs(new Date()).unix();
  const startDateUnix = dayjs(startDate).unix();
  const endDateUnix = dayjs(endDate).unix();

  if (nowDateUnix < startDateUnix) {
    stageStatus = PickemStageStatusEnum.Coming;
  }

  if (nowDateUnix > startDateUnix && nowDateUnix < endDateUnix) {
    stageStatus = PickemStageStatusEnum.Waiting;
  }

  if (nowDateUnix > endDateUnix) {
    stageStatus = PickemStageStatusEnum.End;
  }

  return stageStatus;
};
