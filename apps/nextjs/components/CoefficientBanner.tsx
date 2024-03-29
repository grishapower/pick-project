"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import { useRef } from "react";
import { isMobile } from "react-device-detect";
import Slider from "react-slick";
import { trpc } from "~/contexts/TRPCProvider";

import dayjs from "dayjs";
import { ADS_BANNERS, TEAMS_INFO } from "~/constants";
// import bannerLogo from "~/images/arts/coef_logo.svg";
import { SliderButton } from "~/images/icons";

export const CoefficientBanner = () => {
  const { data: coefData } = trpc.pandascore.getFeedCoef.useQuery();
  const locale = useLocale();
  const sliderRef: any = useRef(null);

  const valuesTeams = Object.values(TEAMS_INFO);

  return (
    <div className="relative flex h-[96px] items-center justify-between bg-black px-8">
      <a href={ADS_BANNERS["ru"]?.mainSide?.link} target="_blank">
        <Image
          src={""} //here was logo
          alt=""
          height={isMobile ? 50 : 96}
          className="hidden h-[96px] max-w-[150px] sm:block sm:h-[96px]"
        />
      </a>
      <Slider
        className="w-full sm:w-[calc(100%-244px)] sm:px-[10px]"
        ref={sliderRef}
        arrows={false}
        slidesToShow={isMobile ? 2 : 5}
        slidesToScroll={1}
        // autoplay
        // autoplaySpeed={5000}
      >
        {coefData &&
          coefData?.map((match, idx) => {
            const teamHomeLogo = valuesTeams.find(
              (i) =>
                (i.feedBbName || i.name)?.toLowerCase() ===
                match.teamHome.toLowerCase(),
            )?.icon;
            const teamAwayLogo = valuesTeams.find(
              (i) =>
                (i.feedBbName || i.name)?.toLowerCase() ===
                match.teamAway.toLowerCase(),
            )?.icon;

            return (
              <div className="relative" key={match.teamAway + idx}>
                <a
                  href={ADS_BANNERS["ru"]?.mainSide?.link}
                  target="_blank"
                  className="inline-flex w-full items-center justify-center gap-3 text-center"
                >
                  <div className="min-w-[40px]">
                    <div className=" h-8">
                      {teamHomeLogo ? (
                        <Image
                          src={teamHomeLogo || ""}
                          alt=""
                          className="mx-auto mb-2 w-6"
                        />
                      ) : (
                        <div className="bg-grey mx-auto h-6 w-6 rounded-lg" />
                      )}
                    </div>

                    <div className="bg-lightBlue3 rounded text-sm font-bold">
                      {match.winHome}
                    </div>
                  </div>
                  <div className="text-sm font-bold">
                    {dayjs(match.date).format("HH:mm")}
                  </div>
                  <div className="min-w-[40px]">
                    <div className="h-8">
                      {teamAwayLogo ? (
                        <Image
                          src={teamAwayLogo || ""}
                          alt=""
                          className="mx-auto mb-2 w-6"
                        />
                      ) : (
                        <div className="bg-grey mx-auto h-6 w-6 rounded-lg" />
                      )}
                    </div>

                    <div className="bg-lightBlue3 rounded text-sm font-bold">
                      {match.winAway}
                    </div>
                  </div>
                </a>
                <div className="bg-darkGrey absolute right-0 top-2 h-[48px] w-[1px]" />
              </div>
            );
          })}
      </Slider>
      <div className="hidden sm:block">
        <SliderButton
          className="mb-1 cursor-pointer opacity-80 transition-all hover:opacity-100"
          onClick={() => sliderRef?.current?.slickPrev()}
        />
        <SliderButton
          className="rotate-180 cursor-pointer opacity-80 transition-all hover:opacity-100"
          onClick={() => sliderRef?.current?.slickNext()}
        />
      </div>
    </div>
  );
};
