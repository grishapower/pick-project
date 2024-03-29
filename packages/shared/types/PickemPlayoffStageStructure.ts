import { Rounds } from "./Rounds";

//TODO REMOVE
export type PlayoffStageStructure = {
  [x in Rounds]?: {
    [x: string]: {
      [PlayoffStagePosiition.Top]: {
        id: number | null;
      };
      [PlayoffStagePosiition.Bot]?: {
        id: number | null;
      };
    };
  };
};

export enum PlayoffStagePosiition {
  "Top" = "top",
  "Bot" = "bot",
}
