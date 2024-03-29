import { PickemStageEnum, StagesRecord } from "@pickem/shared";

//после того как появится разные турнирные стадии переименовать
export const STAGE_ORDER = {
  [PickemStageEnum.Nomination]: 0,
  [PickemStageEnum.Group]: 1,
  [PickemStageEnum.Playoff]: 2,
};

export const sortDataByOrderStage = (arr: StagesRecord[]) =>
  arr.sort(
    (a: any, b: any) =>
      STAGE_ORDER[a.stage as PickemStageEnum] -
      STAGE_ORDER[b.stage as PickemStageEnum],
  );
