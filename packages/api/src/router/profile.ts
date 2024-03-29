import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  getUserInfo: publicProcedure.query(async ({ input, ctx }) => {
    const { supabase, session } = ctx;

    const userId = session?.userId;

    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", userId)
      .limit(1)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }),

  updateProfileInfo: publicProcedure
    .input(
      z.object({
        data: z.object({
          key: z.enum(["view_onboarding", "steam_trade_link", "web_notif_id"]),
          value: z.any(),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { supabase, session } = ctx;

      const userId = session?.userId;

      if (!userId) {
        throw new Error("Unlogin");
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          [input.data.key]: input.data.value,
        })
        .eq("id", userId);

      if (error) {
        throw new Error(error.message);
      }

      return "ok";
    }),

  updateTelegramId: publicProcedure
    .input(
      z.object({
        hash: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { supabase, session } = ctx;
      const splitHash = input.hash.split("=")[1];

      const userId = session?.userId;

      if (!userId) {
        throw new Error("Unlogin");
      }

      if (!splitHash) return false;

      const decodedString = Buffer.from(splitHash, "base64").toString("utf-8");
      const jsonObj = JSON.parse(decodedString);

      const { error } = await supabase
        .from("profiles")
        .update({
          telegram_id: jsonObj.id,
        })
        .eq("id", userId);

      if (error) {
        throw new Error(error.message);
      }

      return "ok";
    }),
});
