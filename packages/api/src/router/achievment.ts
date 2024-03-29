import { createTRPCRouter, publicProcedure } from "../trpc";

export const achievmentRouter = createTRPCRouter({
  getUserAchievment: publicProcedure.query(async ({ input, ctx }) => {
    const { supabase, session } = ctx;

    const userId = session?.userId;

    if (!userId) {
      throw new Error("Unlogin");
    }

    const { data: userMedalsdata } = await supabase
      .from("user_medals")
      .select()
      .eq("user_id", userId);

    if (!userMedalsdata) return [];

    const result = [];

    for (let i = 0; i < userMedalsdata.length; i++) {
      const userMedal = userMedalsdata[i];
      if (!userMedal) continue;

      const achievList: {
        title: string;
        text: string;
        img: string;
        type: "medal" | "achiev";
        level: number;
        allLevel: number;
      }[] = [];

      const { data: tournamentData } = await supabase
        .from("tournaments")
        .select()
        .eq("id", userMedal.tournament_id)
        .single();

      const { data: tasksData } = await supabase
        .from("tournament_tasks")
        .select()
        .eq("tournament_id", userMedal.tournament_id);

      const { data: medalData } = await supabase
        .from("tournament_medal")
        .select()
        .eq("tournament_id", userMedal.tournament_id)
        .single();

      achievList.push({
        level: userMedal.level,
        img: medalData?.img_name || "",
        text: medalData?.text || "",
        title: medalData?.title || "",
        type: "medal",
        allLevel: tasksData?.length || 0,
      });

      result.push({
        name: tournamentData?.name,
        achievList,
      });
    }

    return result;
  }),
});
