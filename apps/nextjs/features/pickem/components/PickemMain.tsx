"use client";

import { Medal, Prize, Stage, Task } from "@pickem/shared";
import { Heading } from "~/components/ui/Heading";
import { Text } from "~/components/ui/Text";

import Slider from "react-slick";
import { Button, MedalView, PrizeCard } from "~/components";
// import pickemMainImg from "~/images/arts/pickemMain.png";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { isMobile } from "react-device-detect";
import { DiscordIcon } from "~/images/icons";
import { TelegramIcon } from "~/images/icons/TelegramIcon";
import { STAGES_ICONS } from "../utils/stages-icon";
import { generateTaskText } from "../utils/taskText";

type Props = {
  prizes?: Prize[];
  stages: Stage[];
  tasksData: Task[];
  medalData?: Medal;
  tournamentName: string;
};

export const PickemMain = ({
  prizes,
  tasksData,
  stages,
  medalData,
  tournamentName,
}: Props) => {
  const t = useTranslations();

  return (
    <div className="bg-bgSecond rounded-2xl px-2 py-6 sm:px-12 sm:pb-12 sm:pt-8">
      <Heading className="mb-3 text-center text-2xl sm:text-4xl">
        {t("pickem.mainTitle")}
      </Heading>

      <Text className="mx-auto mb-5 max-w-[260px] text-center sm:max-w-none sm:text-xl">
        {t("pickem.mainDesc", { tournament: tournamentName })}
      </Text>

      <div className="bg-bgMain mx-auto mb-8 max-w-[720px] rounded-2xl px-4 py-6 sm:px-10 sm:py-8 ">
        <div className="flex-center mb-2 flex-wrap">
          <div className="order-2 sm:order-1">
            {tasksData.map((task) => {
              const findedStage = stages.find((i) => i.id === task.stageId);
              return (
                <div
                  key={task.stageId}
                  className="dark-gradient mb-1 flex h-12 items-center rounded-s-lg pl-4"
                  style={
                    !!task.percent
                      ? {
                          background: `linear-gradient(90deg, #325B18 0%, #222429 ${task.percent}%)`,
                        }
                      : {}
                  }
                >
                  <div className="mr-[10px] min-w-[18px] [&>svg]:fill-white">
                    {
                      STAGES_ICONS?.[
                        findedStage?.stageIcon as keyof typeof STAGES_ICONS
                      ]
                    }
                  </div>
                  <span className="text-grey text-sm sm:text-base">
                    <span className="text-white">
                      {t("pickem.mainTaskCount", {
                        right: task.right,
                        all: task.all,
                      })}
                    </span>
                    &nbsp;
                    {t(generateTaskText(task.taskType))}
                    {findedStage?.name}
                  </span>
                </div>
              );
            })}
          </div>
          {medalData && (
            <div className="order-1 sm:order-2 sm:mb-0 sm:ml-4">
              <MedalView
                level={medalData.level}
                name={medalData.imgName}
                width={isMobile ? 160 : 200}
              />
            </div>
          )}
        </div>
      </div>

      <div className="mb-8 max-w-[784px]">
        <Heading className="mb-2 text-center text-2xl sm:text-[28px]">
          {t("pickem.mainPrizeTitle")}
        </Heading>
        <Text className="mb-6 text-center text-base sm:text-xl">
          {t("pickem.mainPrizeDesc")}
        </Text>
        {prizes && (
          <Slider
            arrows
            slidesToShow={isMobile ? 2 : 3}
            slidesToScroll={1}
            // autoplay
            // autoplaySpeed={2000}
            className="px-3"
          >
            {prizes?.map((prize) => (
              <PrizeCard key={prize.name} {...prize} />
            ))}
          </Slider>
        )}
      </div>

      <div className="mb-8">
        <Heading className="mb-2 text-center text-2xl sm:text-[28px]">
          {t("pickem.mainLinksTitle")}
        </Heading>
        <Text className="mx-auto mb-6 max-w-[300px] text-center text-base sm:max-w-none sm:text-xl">
          {t("pickem.mainLinksDesc")}
        </Text>
        <div className="flex justify-center gap-6">
          <Button className="gap-2" type="darkBlue">
            <DiscordIcon className="fill-white" />
            Discord
          </Button>
          <Button className="gap-2">
            <TelegramIcon className="fill-white" />
            Telegram
          </Button>
        </div>
      </div>

      <div>
        <Heading className="mb-2 text-center text-2xl sm:text-[28px]">
          {t("pickem.mainFaqTitle")}
        </Heading>
        <Text className="mx-auto mb-6 max-w-[300px] text-center text-base sm:max-w-[530px] sm:text-xl">
          {t("pickem.mainFaqDesc")}
        </Text>

        <Link href="/faq">
          <Button className="mx-auto">{t("pickem.mainFaqBtn")}</Button>
        </Link>
      </div>
    </div>
  );
};
