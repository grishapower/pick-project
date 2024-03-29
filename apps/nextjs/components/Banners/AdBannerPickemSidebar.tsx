import Image from "next/image";
import { ADS_BANNERS } from "~/constants";
import { useGetUserGeo } from "~/hooks/useGetUserGeo";

export const AdBannerPickemSidebar = () => {
  const bannerCountry = useGetUserGeo();
  return (
    <a href={ADS_BANNERS[bannerCountry]?.pickemSidebar?.link} target="_blank">
      <Image
        width={248}
        className="w-full"
        src={ADS_BANNERS[bannerCountry]?.pickemSidebar?.img || ""}
        alt=""
      />
    </a>
  );
};
