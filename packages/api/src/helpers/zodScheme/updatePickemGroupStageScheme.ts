import { z } from "zod";

export const updatePickemGroupStageScheme = z.object(
  {
    zero: z.object({
      lose: z.array(z.union([z.null(), z.number()])).max(1),
      win: z.array(z.union([z.null(), z.number()])).max(1),
    }),
    listTeam: z.array(z.union([z.null(), z.number()])).max(7),
  },
  {
    required_error: "Invalid parameters",
  },
);
