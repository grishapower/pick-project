import { PickemStageEnum } from "../../types";
import { StageTypeEnum } from "../enums";
import type { Row } from "../helpers";

export type StagesRecord = Row<"stages">;

//в базе это json, тут описан тип как выглядит этот json
export type StagesJsonData = {
  name: PickemStageEnum;
  data: StagesJsonDataGroup;
};

export type StagesJsonDataGroup = {
  id: number;
  group: string; //TODO by ENUM
}[];

export type StageRow = {
  created_at: string;
  end_date: string;
  id: string;
  name: string;
  serie_id_api: number;
  stage_id_api: number;
  start_date: string;
  teams: number[];
  tournament_id: string;
  type: StageTypeEnum;
};
