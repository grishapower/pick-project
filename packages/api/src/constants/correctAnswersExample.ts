export const ANSWERS_EXAMPLE = {
  group: {
    semifinal: [1, 2],
    quaterfinal: [3, 4, 5, 6, 7, 8], //TODO CHANGE ANSWERS
  },
  playoff: {
    final: {
      pair1: [1],
    },
    winner: {
      pair1: [1, 5],
    },
    semifinal: {
      pair1: [1, 3],
      pair2: [5, 8],
    },
  },

  nominations: {
    nomination1: 1,
    nomination2: 1,
    nomination3: 1,
    nomination4: 1,
    nomination5: 1,
    nomination6: 1,
    nomination7: 1,
    nomination8: 1,
    nomination9: 1,
    nomination10: 1,
    nomination11: 1,
    nomination12: 1,
    nomination13: 1,
    nomination14: 1,
    nomination15: 1,
    nomination16: 1,
  },
};

export const BRACKET_NEXT_STAGE = {
  quaterfinal: {
    pair1: {
      top: {
        id: 1,
        initial: true,
      },
      bot: {
        id: 2,
        initial: true,
      },
    },
    pair2: {
      top: {
        id: 3,
        initial: true,
      },
      bot: {
        id: 4,
        initial: true,
      },
    },
    pair3: {
      top: {
        id: 5,
        initial: true,
      },
      bot: {
        id: 6,
        initial: true,
      },
    },
    pair4: {
      top: {
        id: 7,
        initial: true,
      },
      bot: {
        id: 8,
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

export const ANSWERS_EXAMPLE_SWISS = {
  2: {
    nomination1: 1,
    nomination2: 1,
    nomination3: 1,
    nomination4: 1,
    nomination5: 1,
    nomination6: 1,
    nomination7: 1,
    nomination8: 1,
    nomination9: 1,
    nomination10: 1,
    nomination11: 1,
    nomination12: 1,
    nomination13: 1,
    nomination14: 1,
    nomination15: 1,
    nomination16: 1,
  },
  1: {
    zero: {
      win: [4],
      lose: [6],
    },
    listTeam: [3, 10, 7, 18, 19, 1, 2],
  },
  3: {
    zero: {
      win: [1],
      lose: [2],
    },
    listTeam: [3, 4, 5, 6, 7, 8, 9],
  },
  4: {
    final: {
      pair1: [1, 5],
    },
    winner: {
      pair1: [1],
    },
    semifinal: {
      pair1: [1, 3],
      pair2: [5, 8],
    },
  },
};
