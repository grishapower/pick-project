import { StageTypeEnum } from "../../supabase/enums";
import { PickemStageStatusEnum } from "../PickemStageStatusEnum";

//maybe remove folder API
export type Stage = {
  id: string;
  end_date: string;
  start_date: string;
  name: string;
  teams: number[];
  type: StageTypeEnum;
  stageStatus: PickemStageStatusEnum;
  stageOrder: number;
  stageGroup: string;
  stageIcon: string;
};
