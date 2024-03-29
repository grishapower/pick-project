"use client";

import Image from "next/image";
import { ADS_BANNERS } from "~/constants";
import { useGetUserGeo } from "~/hooks/useGetUserGeo";

export const AdBannerMobile = () => {
  const bannerCountry = useGetUserGeo();

  return (
    <a href={ADS_BANNERS[bannerCountry]?.mobileNav?.link} target="_blank">
      <Image
        src={ADS_BANNERS[bannerCountry]?.mobileNav?.img || ""}
        alt=""
        width={320}
        height={50}
      />
    </a>
  );
};
