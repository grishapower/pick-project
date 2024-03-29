"use client";

import Image from "next/image";
import { ADS_BANNERS } from "~/constants";
import { useGetUserGeo } from "~/hooks/useGetUserGeo";

export const AdBannerLeaderboard = () => {
  const bannerCountry = useGetUserGeo();

  return (
    <a
      className="mb-5 hidden h-[197px] w-full overflow-hidden rounded-3xl sm:block"
      href={ADS_BANNERS[bannerCountry]?.leaderboard?.link}
      target="_blank"
    >
      <Image
        src={ADS_BANNERS[bannerCountry]?.leaderboard?.img || ""}
        unoptimized={true}
        alt=""
      />
    </a>
  );
};
