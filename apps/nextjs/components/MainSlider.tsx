"use client";

import { PickemStageStatusEnum } from "@pickem/shared";
import cn from "classnames";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import { BANNER_IMG } from "~/constants/banner-img";
import { trpc } from "~/contexts/TRPCProvider";
import { SliderButton } from "~/images/icons";
import { pluralize } from "~/utils/pluralize";
import { AdBannerMainSlider } from "./Banners/AdBannerMainSlider";
import { CountdownWrap } from "./CountdownWrap";
import { Skeleton } from "./Skeleton";
import { Heading } from "./ui/Heading";
import { Text } from "./ui/Text";

export const MainSlider = () => {
  const sliderBannerRef: any = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const t = useTranslations();

  const { data: tournaments, isLoading } =
    trpc.tournaments.getTournaments.useQuery({
      type: "full",
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
    return (
      <Skeleton className="blue-gradient-main mb-4 h-[320px] w-full max-w-[784px] sm:mb-0" />
    );
  }
  return (
    <div className="relative mb-4 w-full max-w-[784px] overflow-hidden rounded-2xl sm:mb-0">
      <Slider
        {...SLIDER_SETTINGS}
        ref={sliderBannerRef}
        className="blue-gradient-main h-[320px] rounded-2xl"
        beforeChange={(currSlide) => setCurrentSlide(currSlide)}
      >
        {tournaments &&
          tournaments.map((tournament) => {
            const isTournamentComing = tournament.stages?.every(
              (i) => i.status === PickemStageStatusEnum.Coming,
            );
            const isTournamentEnded = tournament.stages?.every(
              (i) => i.status === PickemStageStatusEnum.End,
            );
            const isWaitingStage = tournament.stages?.find(
              (i) => i.status === PickemStageStatusEnum.Waiting,
            );

            const isComingStage = tournament.stages?.find(
              (i) => i.status === PickemStageStatusEnum.Coming,
            );

            const isWaitingDoneStage = tournament.stages?.find(
              (i) => i.status === PickemStageStatusEnum.Waiting_done,
            );
            const currStage =
              isWaitingStage || isWaitingDoneStage || isComingStage;

            return (
              <Link
                href={`/tournament/${tournament.id}`}
                key={tournament.name}
                className="h-[320px] rounded-lg px-4 py-6 sm:px-10 sm:py-8"
              >
                <div className="flex h-full justify-between sm:justify-start">
                  <div className="mt-[30px] flex flex-col justify-between">
                    <div>
                      <Text className="mb-1 text-sm font-bold sm:mb-0 sm:text-xl">
                        {dayjs(tournament?.startDate).format("DD.MM")} -{" "}
                        {dayjs(tournament?.endDate).format("DD.MM")}
                      </Text>
                      <Heading className="max-w-[220px] text-xl leading-tight sm:max-w-[400px] sm:text-[40px]">
                        {tournament?.name}
                      </Heading>
                    </div>
                    <div>
                      <div className="items-center gap-4 sm:flex">
                        <div className="bg-lighBlue2 mb-2 inline-flex rounded-lg sm:mb-0">
                          <div className="bg-yellow rounded-lg px-4 py-3">
                            <Text className="whitespace-nowrap text-base text-black sm:text-xl">
                              {isTournamentComing && (
                                <>{t("mainBanner.tournamentComing")}</>
                              )}
                              {isTournamentEnded && (
                                <>{t("mainBanner.tournamentEnd")}</>
                              )}
                              {isWaitingStage && (
                                <>{t("mainBanner.stageWaiting")}</>
                              )}
                              {isComingStage &&
                                !isTournamentComing &&
                                !isWaitingStage && (
                                  <>
                                    {t("mainBanner.stageComing")}
                                    {currStage?.stageName}
                                  </>
                                )}
                            </Text>
                          </div>
                          {currStage ? (
                            <Text className="ml-4 flex gap-1 py-3 pr-4 text-base text-white sm:text-xl">
                              <CountdownWrap
                                date={
                                  currStage?.time ? currStage.time : undefined
                                }
                              />
                            </Text>
                          ) : null}
                        </div>
                        {!isTournamentComing && (
                          <Text className="text-base sm:text-xl sm:font-bold ">
                            {tournament.participants.all}{" "}
                            {pluralize(tournament.participants.all, [
                              t("mainBanner.participantOne"),
                              t("mainBanner.participantFew"),
                              t("mainBanner.participantMany"),
                            ])}
                          </Text>
                        )}
                      </div>
                    </div>
                  </div>

                  <Image
                    className="w-[90px] self-start sm:ml-10 sm:w-auto sm:self-end"
                    src={BANNER_IMG[tournament?.img as keyof typeof BANNER_IMG]}
                    alt=""
                  />
                </div>
              </Link>
            );
          })}
        <AdBannerMainSlider />
      </Slider>
      {tournaments && tournaments?.length + 1 > 1 ? (
        <div className="absolute bottom-6 right-4 flex items-center gap-2 sm:bottom-4 sm:right-4">
          <SliderButton
            className="cursor-pointer opacity-80 transition-all hover:opacity-100"
            onClick={() => sliderBannerRef?.current?.slickPrev()}
          />
          <SliderButton
            className="rotate-180 cursor-pointer opacity-80 transition-all hover:opacity-100"
            onClick={() => sliderBannerRef?.current?.slickNext()}
          />
        </div>
      ) : null}

      {tournaments && tournaments?.length + 1 > 1 ? (
        <div className="absolute left-4 top-8 mb-6 flex items-center gap-1 sm:left-[40px]">
          {Array.from(
            { length: tournaments?.length + 1 },
            (_, index) => index,
          ).map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "h-2 w-2 rounded-full bg-white opacity-80 transition-all",
                {
                  ["w-6 "]: idx === currentSlide,
                },
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
