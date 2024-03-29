import { PlayoffBracketSingleElim2Type } from "../../../types";

//SINGLE_ELIMINATION_2
export const PLAYOFF_SET_2: PlayoffBracketSingleElim2Type = {
  quaterfinal: {
    pair1: {
      top: {
        id: null,
        initial: true,
      },
      bot: {
        id: null,
        initial: true,
      },
    },
    pair2: {
      top: {
        id: null,
        initial: true,
      },
      bot: {
        id: null,
        initial: true,
      },
    },
  },
  semifinal: {
    pair1: {
      top: { id: null, initial: true },
      bot: { id: null, initial: false },
    },
    pair2: {
      top: { id: null, initial: true },
      bot: { id: null, initial: false },
    },
  },
  final: {
    pair1: {
      top: { id: null, initial: false },
      bot: { id: null, initial: false },
    },
  },
  winner: {
    pair1: {
      top: { id: null, initial: false },
    },
  },
};
