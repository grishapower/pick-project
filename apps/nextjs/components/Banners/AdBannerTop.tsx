"use client";

import Image from "next/image";
import { ADS_BANNERS } from "~/constants";
import { useGetUserGeo } from "~/hooks/useGetUserGeo";

export const AdBannerTop = () => {
  const bannerCountry = useGetUserGeo();
  return (
    <div className="h-[96px]">
      <a
        className="hidden h-full sm:block"
        href={ADS_BANNERS[bannerCountry]?.topBanner?.link}
        target="_blank"
      >
        <Image
          src={ADS_BANNERS[bannerCountry]?.topBanner?.img || ""}
          className="h-full"
          alt=""
        />
      </a>
      <a
        className="block h-full sm:hidden"
        href={ADS_BANNERS[bannerCountry]?.topBannerMobile?.link}
        target="_blank"
      >
        <Image
          src={ADS_BANNERS[bannerCountry]?.topBannerMobile?.img || ""}
          className="h-full w-full"
          alt=""
        />
      </a>
    </div>
  );
};
