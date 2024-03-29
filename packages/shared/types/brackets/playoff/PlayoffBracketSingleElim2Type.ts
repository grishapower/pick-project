import { Rounds } from "../../Rounds";

export type PlayoffBracketSingleElim2Type = {
  [x in Rounds]?: {
    [x: string]: {
      top: { id: number | null; initial: boolean };
      bot?: { id: number | null; initial: boolean };
    };
  };
};
