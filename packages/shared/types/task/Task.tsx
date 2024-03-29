import { TaskTypeEnum } from "../../supabase/enums";

export type Task = {
  percent: number;
  right: number;
  all: number;
  completed: boolean;
  taskType: TaskTypeEnum;
  stageId: string;
};
