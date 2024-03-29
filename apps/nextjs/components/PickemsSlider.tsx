"use client";
import { PickemStageStatusEnum } from "@pickem/shared";
import cn from "classnames";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { Fragment, useRef } from "react";
import Slider, { Settings } from "react-slick";
import { trpc } from "~/contexts/TRPCProvider";
import { useGetSession } from "~/hooks/useGetSession";
import {
  LeaderboardIcon,
  ScoreIcon,
  SliderButton,
  StageIcon,
} from "~/images/icons";
import { AuthButton } from "./AuthButton";
import { CountdownWrap } from "./CountdownWrap";
import { DefaultPickemInfo } from "./DefaultPickemInfo";
import { MedalView } from "./MedalView";
import { Skeleton } from "./Skeleton";
import { Heading } from "./ui/Heading";
import { Text } from "./ui/Text";

export const PickemsSlider = () => {
  const session = useGetSession();
  const locale = useLocale();
  const t = useTranslations();
  const sliderPickemRef: any = useRef(null);

  const { data: pickemsData, isLoading } =
    trpc.pickems.getAllUserPickems.useQuery({
      locale,
    });

  const SLIDER_SETTINGS: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    // autoplay: true,
    // autoplaySpeed: 20000,

    slidesToScroll: 1,
    arrows: false,
  };

  if (isLoading) {
    return <Skeleton className="h-[320px] w-[384px] rounded-lg" />;
  }

  return (
    <div
      className={cn(
        "relative h-auto w-full rounded-2xl bg-black px-4 pb-4 pt-4 sm:h-[320px] sm:w-[384px] sm:px-6 sm:pt-6",
      )}
    >
      {!session.isAuth && (
        <div className="inset-center absolute z-[1]">
          <AuthButton />
        </div>
      )}
      <div
        className={cn({
          ["select-none blur-sm"]: !session.isAuth,
        })}
      >
        <div className="mb-6 flex items-center justify-between">
          <Heading className="text-2xl">{t("secondBanner.title")}</Heading>
          {pickemsData && pickemsData.length > 1 ? (
            <Link href="/tournament">
              <Text className="text-blueMain">{t("secondBanner.viewAll")}</Text>
            </Link>
          ) : null}
        </div>
        {!session.isAuth && <DefaultPickemInfo />}
        {pickemsData && pickemsData.length ? (
          <>
            <Slider {...SLIDER_SETTINGS} ref={sliderPickemRef}>
              {pickemsData.length > 0 &&
                pickemsData.map((pickem) => {
                  return (
                    <Fragment key={pickem.title}>
                      <Text className="mb-4 inline-block truncate text-xl font-bold">
                        {pickem.title}
                      </Text>
                      <div className="mb-2 flex gap-2">
                        <div className="bg-bgMain flex w-[196px] items-start gap-2 rounded-2xl px-4 py-[12px]">
                          <div className="bg-darkGrey flex-center h-10 w-10 rounded-lg">
                            <LeaderboardIcon />
                          </div>
                          <div>
                            <Text className="text-grey text-xs">
                              {t("secondBanner.currentPosition")}
                            </Text>
                            <Text className="text-lg font-bold sm:text-xl">
                              {pickem.position ? (
                                <>
                                  {pickem.position} из {pickem.allParticipants}
                                </>
                              ) : (
                                t("secondBanner.soon")
                              )}
                            </Text>
                          </div>
                        </div>
                        <div className="bg-bgMain flex w-[133px] items-start gap-2 rounded-2xl px-4 py-[12px]">
                          <div className="bg-darkGrey flex-center h-10 w-10 rounded-lg">
                            <ScoreIcon />
                          </div>
                          <div>
                            <Text className="text-grey text-xs">
                              {t("secondBanner.points")}
                            </Text>
                            <Text className="text-xl font-bold">
                              {(pickem.position && pickem.points) || 0}
                            </Text>
                          </div>
                        </div>
                      </div>

                      <div className="bg-bgMain flex h-[68px] justify-between rounded-lg">
                        <div className="flex-center gap-2 px-4">
                          <div className="bg-darkGrey flex-center h-10 w-10 rounded-lg">
                            <StageIcon />
                          </div>
                          <div>
                            <Text className="text-grey text-xs">
                              {t("secondBanner.stageTournament")}
                            </Text>
                            <Text className="truncate text-xl font-bold">
                              {(pickem?.stage && pickem.stageName) ||
                                t("secondBanner.tournamentEnd")}
                            </Text>
                          </div>
                        </div>
                        {pickem.stageStatus ? (
                          <div className="bg-yellow flex-center flex-col rounded-lg px-3">
                            <Text className="truncate text-xs text-black">
                              {pickem.stageStatus ===
                              PickemStageStatusEnum.Waiting
                                ? t("secondBanner.makePickem")
                                : t("secondBanner.waiting")}
                            </Text>
                            <Text className="flex gap-1 text-xl font-bold text-black">
                              {pickem.time ? (
                                <CountdownWrap date={pickem.time} />
                              ) : null}
                            </Text>
                          </div>
                        ) : null}
                      </div>
                    </Fragment>
                  );
                })}
            </Slider>
            {pickemsData.length > 1 && (
              <div className="flex-center gap-2">
                <SliderButton
                  className="cursor-pointer opacity-80 transition-all hover:opacity-100"
                  onClick={() => sliderPickemRef?.current?.slickPrev()}
                />
                <SliderButton
                  className="rotate-180 cursor-pointer opacity-80 transition-all hover:opacity-100"
                  onClick={() => sliderPickemRef?.current?.slickNext()}
                />
              </div>
            )}
            <div className="absolute right-[30px] top-[40px]">
              <MedalView
                level={pickemsData?.[0]?.userMedal?.level}
                height={70}
                width={70}
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
