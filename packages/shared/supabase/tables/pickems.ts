import type { Row } from "../helpers";

export type PickemsRecord = Row<"pickems">;

export type Pickem = Omit<
  PickemsRecord,
  "created_at" | "id" | "user_id" | "tournament_id"
>;

export type PickemData = {
  stages: {
    [x: string]: any;
  };
};
