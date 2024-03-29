import { Prize } from "@pickem/shared";
import cn from "classnames";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { isMobile } from "react-device-detect";
import { getPrizeImgPath } from "~/utils/getPrizeImgPath";
import { Text } from "./ui/Text";

export const PrizeCard = ({
  img,
  name,
  type,
  winPositionEnd,
  winPositionStart,
}: Prize) => {
  const t = useTranslations();

  return (
    <div
      className={cn(
        "bg-bgMain flex w-[150px] flex-col items-center justify-between rounded-2xl p-4 text-center sm:w-[250px]",
      )}
    >
      <div className="mb-4 flex h-[140px] w-[140px] items-center">
        <Image
          src={getPrizeImgPath(img) || ""}
          alt=""
          width={isMobile ? 120 : 140}
          height={isMobile ? 120 : 140}
          className="mx-auto h-full w-auto"
        />
      </div>
      <div>
        <Text className="text-base">
          {winPositionStart}
          {!!winPositionEnd && `-${winPositionEnd}`}{" "}
          {t("pickem.mainPrizeItemPlace")}
        </Text>
        <Text className="text-grey mb-2">{name}</Text>
      </div>
    </div>
  );
};
