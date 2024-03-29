import { achievmentRouter } from "./router/achievment";
import { adminRouter } from "./router/admin";
import { answersRouter } from "./router/answers";
import { bracketsRouter } from "./router/brackets";
import { inventoryRouter } from "./router/inventory";
import { medalRouter } from "./router/medal";
import { newsRouter } from "./router/news";
import { notificationsRouter } from "./router/notifications";
import { pandaScoreRouter } from "./router/pandascore";
import { pickemsRouter } from "./router/pickems";
import { prizesRouter } from "./router/prizes";
import { profileRouter } from "./router/profile";
import { stagesRouter } from "./router/stages";
import { steamRouter } from "./router/steam";
import { tasksRouter } from "./router/tasks";
import { tournamentsRouter } from "./router/tournaments";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  profile: profileRouter,
  steam: steamRouter,
  tournaments: tournamentsRouter,
  pickems: pickemsRouter,
  stages: stagesRouter,
  admin: adminRouter,
  inventory: inventoryRouter,
  pandascore: pandaScoreRouter,
  brackets: bracketsRouter,
  prizes: prizesRouter,
  answers: answersRouter,
  news: newsRouter,
  notification: notificationsRouter,
  tasks: tasksRouter,
  medal: medalRouter,
  achievment: achievmentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
