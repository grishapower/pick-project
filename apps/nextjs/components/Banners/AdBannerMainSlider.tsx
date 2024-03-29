"use client";

import Image from "next/image";
import { isMobile } from "react-device-detect";
import { ADS_BANNERS } from "~/constants";
import { useGetUserGeo } from "~/hooks/useGetUserGeo";

export const AdBannerMainSlider = () => {
  const bannerCountry = useGetUserGeo();

  const mainBanner = isMobile
    ? ADS_BANNERS[bannerCountry]?.mainSliderMobile
    : ADS_BANNERS[bannerCountry]?.mainSlider;

  return (
    <>
      <a className="block h-[320px]" href={mainBanner?.link} target="_blank">
        <Image
          className="h-full"
          src={mainBanner?.img || ""}
          alt=""
          unoptimized={true}
        />
      </a>
    </>
  );
};
