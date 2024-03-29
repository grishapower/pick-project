import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const notificationsRouter = createTRPCRouter({
  getUserNotifications: publicProcedure
    .input(z.object({ locale: z.string() }))
    .query(async ({ input, ctx }) => {
      const { supabase, session } = ctx;
      const userId = session?.userId;

      const isLocaleEn = input.locale === "en";

      const { data } = await supabase
        .from("notifications")
        .select()
        .eq("user_id", userId);

      if (!data) return [];

      return data.map((i) => ({
        // ...i,
        id: i.id,
        isRead: i.is_read,
        archive: i.archive,
        text: isLocaleEn ? i.text_en : i.text,
        title: isLocaleEn ? i.title_en : i.title,
      }));
    }),

  readAllNotifications: publicProcedure.mutation(async ({ ctx }) => {
    const { supabase, session } = ctx;
    const userId = session?.userId;

    const { data } = await supabase
      .from("notifications")
      .update({
        is_read: true,
      })
      .eq("user_id", userId);

    if (!data) return [];

    return "ok";
  }),

  archiveNotifications: publicProcedure
    .input(z.object({ idNotif: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      const { supabase, session } = ctx;

      const userId = session?.userId;

      await supabase
        .from("notifications")
        .update({
          archive: true,
        })
        .eq("user_id", userId)
        .in("id", input.idNotif);

      return "ok";
    }),
});
