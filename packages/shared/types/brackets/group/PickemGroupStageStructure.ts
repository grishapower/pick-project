import { Rounds } from "../../Rounds";

//maybe move to another file
//rename and move to another file default-bracket
export type GroupBracketDefaultType = {
  [x in Rounds]?: GroupBracketDefaultPositionType;
};

export type GroupBracketDefaultPositionType = {
  one?: number | null;
  two?: number | null;
  three?: number | null;
  four?: number | null;
};
