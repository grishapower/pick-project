import { GROUP_SET_1 } from "./group/group-set-1";
import { GROUP_SET_2 } from "./group/group-set-2";
import { NOMINATIONS_SET_1 } from "./nominations/nominations-set-1";
import { NOMINATIONS_SET_2 } from "./nominations/nominations-set-2";
import { PLAYOFF_SET_1 } from "./playoff/playoff-set-1";
import { PLAYOFF_SET_2 } from "./playoff/playoff-set-2";

export const BRACKET_BY_ENUM = {
  PLAYOFF: {
    PLAYOFF_SINGLE_ELIMINATION_1: PLAYOFF_SET_1,
    PLAYOFF_SINGLE_ELIMINATION_2: PLAYOFF_SET_2,
  },
  GROUP: {
    GROUP_DEFAULT_1: GROUP_SET_1,
    GROUP_SWISS_1: GROUP_SET_2,
  },
  NOMINATION: {
    NOMINATION_1: NOMINATIONS_SET_1,
    NOMINATION_2: NOMINATIONS_SET_2,
  },
};
