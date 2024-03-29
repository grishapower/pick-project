import { PickemStageStatusEnum, Stage } from "@pickem/shared";

import { useTranslations } from "next-intl";
import { CustomScrollbar } from "~/components";
import { PICKEM_ITEMS, SIDEBAR_ITEMS } from "~/features/pickem";
import { getStageStringByStatus } from "../utils/getStatusString";
import { STAGES_ICONS } from "../utils/stages-icon";
import { SidebarItemMobile } from "./SidebarItemMobile";

type Props = {
  selectedItem: PICKEM_ITEMS | string;
  setItem: (x: PICKEM_ITEMS | string) => void;
  stagesData: Stage[];
};

export const PickemSidebarMobile = ({
  selectedItem,
  setItem,
  stagesData,
}: Props) => {
  const t = useTranslations();

  return (
    <CustomScrollbar
      scrollbar={{
        autoHeight: true,
        // height: 48,
        // className: "flex",
      }}
    >
      <div className="flex sm:hidden">
        <SidebarItemMobile
          title={t(SIDEBAR_ITEMS[PICKEM_ITEMS.Main].title)}
          // desc={SIDEBAR_ITEMS[PICKEM_ITEMS.Main].desc}
          icon={SIDEBAR_ITEMS[PICKEM_ITEMS.Main].Icon}
          onClick={() => setItem(PICKEM_ITEMS.Main)}
          selected={selectedItem === PICKEM_ITEMS.Main}
        />
        <SidebarItemMobile
          title={t(SIDEBAR_ITEMS[PICKEM_ITEMS.Leaderboard].title)}
          // desc={SIDEBAR_ITEMS[PICKEM_ITEMS.Leaderboard].desc}
          icon={SIDEBAR_ITEMS[PICKEM_ITEMS.Leaderboard].Icon}
          onClick={() => setItem(PICKEM_ITEMS.Leaderboard)}
          selected={selectedItem === PICKEM_ITEMS.Leaderboard}
        />

        {stagesData
          .sort((a, b) => a.stageOrder - b.stageOrder)
          .map(({ end_date, start_date, stageStatus, name, id, stageIcon }) => {
            let { resultText, time } = getStageStringByStatus(
              stageStatus,
              start_date,
              end_date,
            );

            return (
              <SidebarItemMobile
                key={name}
                title={name}
                desc={t(resultText)}
                icon={STAGES_ICONS?.[stageIcon as keyof typeof STAGES_ICONS]}
                time={time}
                onClick={() => setItem(id)}
                selected={selectedItem === id}
                locked={stageStatus === PickemStageStatusEnum.Coming}
              />
            );
          })}
      </div>
    </CustomScrollbar>
  );
};
