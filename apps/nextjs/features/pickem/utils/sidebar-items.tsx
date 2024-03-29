import { HomeIcon, LeaderboardIcon } from "~/images/icons";
import { PICKEM_ITEMS } from "./pickem-items";

export const SIDEBAR_ITEMS = {
  [PICKEM_ITEMS.Main]: {
    title: "pickem.sidebarMain",
    // desc: "Вся инфа о турнире",
    Icon: <HomeIcon />,
    id: PICKEM_ITEMS.Main,
  },

  [PICKEM_ITEMS.Leaderboard]: {
    title: "pickem.sidebarLeaderboard",
    // desc: "Таблица лидеров",
    Icon: <LeaderboardIcon />,
    id: PICKEM_ITEMS.Leaderboard,
  },
};
