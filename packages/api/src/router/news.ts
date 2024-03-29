import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const newsRouter = createTRPCRouter({
  getAllNews: publicProcedure
    .input(z.object({ locale: z.string() }))
    .query(async ({ ctx, input }) => {
      const { supabase } = ctx;
      const isLocaleEn = input.locale === "en";

      const { data } = await supabase.from("news").select();

      return data?.map((i) => ({
        ...i,
        text: isLocaleEn ? i.text_en : i.text,
        title: isLocaleEn ? i.title_en : i.title,
      }));
    }),

  getNewsBySlug: publicProcedure
    .input(z.object({ slug: z.string(), locale: z.string() }))
    .query(async ({ input, ctx }) => {
      const { supabase } = ctx;

      const isLocaleEn = input.locale === "en";

      const { data } = await supabase
        .from("news")
        .select()
        .eq("slug", input.slug)
        .single();

      return {
        text: isLocaleEn ? data?.text_en : data?.text,
        title: isLocaleEn ? data?.title_en : data?.title,
        date: data?.created_at,
      };
    }),
});
