import { PlayoffBracketSingleElim2Type } from "../../../types";

// 131441
// 130564
// 3455
// 3310
// 3240
// 3216
// 3212
// 3210
//SINGLE_ELIMINATION_1
export const PLAYOFF_SET_1: PlayoffBracketSingleElim2Type = {
  quaterfinal: {
    pair1: {
      top: {
        id: null, //131441,
        initial: true,
      },
      bot: {
        id: null, //130564,
        initial: true,
      },
    },
    pair2: {
      top: {
        id: null, //3455,
        initial: true,
      },
      bot: {
        id: null, //3310,
        initial: true,
      },
    },
    pair3: {
      top: {
        id: null, //3240,
        initial: true,
      },
      bot: {
        id: null, //3216,
        initial: true,
      },
    },
    pair4: {
      top: {
        id: null, //3212,
        initial: true,
      },
      bot: {
        id: null, //3210,
        initial: true,
      },
    },
  },
  semifinal: {
    pair1: {
      top: {
        id: null,
        initial: false,
      },
      bot: {
        id: null,
        initial: false,
      },
    },
    pair2: {
      top: {
        id: null,
        initial: false,
      },
      bot: {
        id: null,
        initial: false,
      },
    },
  },
  final: {
    pair1: {
      top: {
        id: null,
        initial: false,
      },
      bot: {
        id: null,
        initial: false,
      },
    },
  },
  winner: {
    pair1: {
      top: {
        id: null,
        initial: false,
      },
    },
  },
};
