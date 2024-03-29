import { PlayoffBracketSingleElim2Type } from "../types";
import { Rounds } from "../types/Rounds";

export const ROUNDS_ORDER = {
  [Rounds.Quaterfinal]: 0,
  [Rounds.Semifinal]: 1,
  [Rounds.Final]: 2,
  [Rounds.Winner]: 3,
};

//TODO MOVE TO SHARED (rename types to shared folder)
export const sortObjectByRoundOrder = (
  obj: PlayoffBracketSingleElim2Type,
): any => {
  const entries = Object.entries(obj);

  entries.sort(
    (a, b) => ROUNDS_ORDER[a[0] as Rounds] - ROUNDS_ORDER[b[0] as Rounds],
  );

  return entries.reduce(
    (sortedObj: PlayoffBracketSingleElim2Type, [key, value]) => {
      sortedObj[key as Rounds] = value;
      return sortedObj;
    },
    {} as PlayoffBracketSingleElim2Type,
  );
};
