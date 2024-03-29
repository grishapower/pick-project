import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const inventoryRouter = createTRPCRouter({
  getInventory: publicProcedure.query(async ({ input, ctx }) => {
    const { supabase, session } = ctx;

    const userId = session?.userId;

    if (!userId) {
      throw new Error("Unlogin");
    }

    const { data } = await supabase
      .from("inventory")
      .select()
      .eq("user_id", userId);

    if (!data) return false;

    return data;
  }),
  getNewInventoryItems: publicProcedure.query(async ({ input, ctx }) => {
    const { supabase, session } = ctx;
    const userId = session?.userId;

    const { data } = await supabase
      .from("inventory")
      .select()
      .eq("user_id", userId)
      .eq("isNew", true);

    if (!data) return false;

    return data.length;
  }),
  takeItem: publicProcedure
    .input(
      z.object({
        itemId: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { supabase, session } = ctx;
      const { itemId } = input;

      const userId = session?.userId;

      if (!userId) {
        throw new Error("Unlogin");
      }

      await supabase
        .from("inventory")
        .update({ used: true })
        .eq("user_id", userId || "")
        .eq("id", itemId);

      return true;
    }),
  readAllNewItems: publicProcedure.query(async ({ input, ctx }) => {
    const { supabase, session } = ctx;

    const userId = session?.userId;

    if (!userId) {
      throw new Error("Unlogin");
    }

    await supabase
      .from("inventory")
      .update({ isNew: false })
      .eq("user_id", userId);

    return true;
  }),
});
