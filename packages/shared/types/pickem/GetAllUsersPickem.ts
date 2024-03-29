import { Medal } from "../medal/Medal";
import { PickemStageEnum } from "../PickemStageEnum";
import { PickemStageStatusEnum } from "../PickemStageStatusEnum";

export type GetAllUserPickems = {
  title: string;
  position: number | null;
  allParticipants: number;
  points: number;
  stage: PickemStageEnum;
  stageStatus: PickemStageStatusEnum;
  stageName: string;
  time: string;
  userMedal: Medal;
};
