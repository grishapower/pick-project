import { PickemStageStatusEnum, Stage } from "@pickem/shared";

import cn from "classnames";
import _groupBy from "lodash.groupby";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { AdBannerPickemSidebar } from "~/components";
import { PICKEM_ITEMS, SIDEBAR_ITEMS } from "~/features/pickem";
import { getStageStringByStatus } from "~/features/pickem/utils/getStatusString";
import { ArrowLeftIcon } from "~/images/icons/ArrowLeftIcon";
import { STAGES_ICONS } from "../utils/stages-icon";
import { SibebarItem } from "./SidebarItem";

type Props = {
  selectedItem: PICKEM_ITEMS | string;
  setItem: (x: PICKEM_ITEMS | string) => void;
  stagesData: Stage[];
};

export const PickemSidebar = ({ selectedItem, setItem, stagesData }: Props) => {
  const router = useRouter();
  const t = useTranslations();

  const grouppedStages = _groupBy(stagesData, "stageGroup");

  const grouppedStagesKeys = Object.keys(
    grouppedStages,
  ) as (keyof typeof grouppedStages)[];

  return (
    <div className="bg-bgSecond min-w-[284px] max-w-[284px] gap-4 rounded-2xl p-6">
      <div className="border-darkGrey mb-3 border-b pb-3">
        <SibebarItem
          className="mb-3"
          title={t(SIDEBAR_ITEMS[PICKEM_ITEMS.Main].title)}
          icon={SIDEBAR_ITEMS[PICKEM_ITEMS.Main].Icon}
          onClick={() => setItem(PICKEM_ITEMS.Main)}
          selected={selectedItem === PICKEM_ITEMS.Main}
        />

        <SibebarItem
          title={t(SIDEBAR_ITEMS[PICKEM_ITEMS.Leaderboard].title)}
          icon={SIDEBAR_ITEMS[PICKEM_ITEMS.Leaderboard].Icon}
          onClick={() => setItem(PICKEM_ITEMS.Leaderboard)}
          selected={selectedItem === PICKEM_ITEMS.Leaderboard}
        />
      </div>

      {grouppedStagesKeys
        .sort((a, b) => {
          // if (!grouppedStages && !grouppedStages[a]) return true;

          return grouppedStages[a]!.length - grouppedStages[b]!.length;
        })
        .map((item, idx) => {
          const group: Stage[] = grouppedStages[item] || [];

          const isLastItem = idx === grouppedStagesKeys.length - 1;
          return (
            <div
              key={idx}
              className={cn({
                ["border-darkGrey mb-3 border-b"]: !isLastItem,
              })}
            >
              {group
                .sort((a, b) => a.stageOrder - b.stageOrder)
                .map(
                  ({
                    end_date,
                    start_date,
                    stageStatus,
                    name,
                    id,
                    stageIcon,
                  }) => {
                    let { resultText, time } = getStageStringByStatus(
                      stageStatus,
                      start_date,
                      end_date,
                    );

                    const isActive =
                      stageStatus === PickemStageStatusEnum.Waiting ||
                      stageStatus === PickemStageStatusEnum.Waiting_done;

                    return (
                      <div className="mb-3" key={name}>
                        <SibebarItem
                          title={name}
                          desc={t(resultText)}
                          icon={
                            STAGES_ICONS?.[
                              stageIcon as keyof typeof STAGES_ICONS
                            ]
                          }
                          time={time}
                          onClick={() => setItem(id)}
                          selected={selectedItem === id}
                          locked={stageStatus === PickemStageStatusEnum.Coming}
                          end={stageStatus === PickemStageStatusEnum.End}
                          active={isActive}
                        />
                      </div>
                    );
                  },
                )}
            </div>
          );
        })}

      <div className="-ml-6 mb-6 w-[calc(100%+48px)]">
        <AdBannerPickemSidebar />
      </div>

      <div>
        <SibebarItem
          // title={"К списку событий"}
          title={t("pickem.sidebarBack")}
          icon={<ArrowLeftIcon />}
          onClick={() => router.push("/")}
        />
      </div>
    </div>
  );
};
