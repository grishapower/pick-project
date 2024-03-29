import { z } from "zod";

const playerSchema = z.object({
  id: z.union([z.number(), z.null()]),
  initial: z.boolean(),
});

const pairSchema = z.object({
  top: playerSchema,
  bot: playerSchema.optional(), // Делаем необязательным для случая победителя
});

const pairsSchema = z.record(pairSchema);

export const updatePickemPlayoffStageScheme = z.object({
  quaterfinal: pairsSchema,
  semifinal: pairsSchema,
  final: pairsSchema,
  winner: z.object({
    pair1: z.object({
      top: playerSchema,
    }),
  }),
});
