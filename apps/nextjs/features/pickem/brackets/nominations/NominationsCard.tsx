import { PickemNominationsEnum } from "@pickem/shared";
import cn from "classnames";
import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import { Text } from "~/components/ui/Text";
import { PlusIcon, RefreshIcon } from "~/images/icons";
import { LockIcon } from "~/images/icons/LockIcon";

//TODO REFACTOR THIS
export type Props = {
  title: string;
  selected: boolean;
  disabled?: boolean;
  onClick?: () => void;
  isAnswerCorrect: boolean;
  stageComing?: boolean;
  id: PickemNominationsEnum;
  stageEnd?: boolean;
  type: string;
  viewMode?: boolean;
  showResult: boolean;

  //new
  img?: StaticImageData;
  text?: string;
  logo?: StaticImageData;
};

export const NominationCard = ({
  title,
  selected,
  disabled,
  onClick,
  isAnswerCorrect,
  stageComing,
  stageEnd,
  type,
  viewMode,
  showResult,
  img,
  text,
  logo,
}: Props) => {
  const t = useTranslations();

  return (
    <div className="bg-bgSecond flex h-[210px] w-full max-w-[150px] flex-col overflow-hidden rounded-2xl p-4 text-center sm:h-[240px] sm:max-w-[209px]">
      <Text className="max-2-lines flex-center mb-4 min-h-[48px] text-xs sm:text-base">
        {title}
      </Text>

      {selected ? (
        <div
          onClick={() => !disabled && onClick?.()}
          className={cn(
            "flex-center relative h-[110px] overflow-hidden rounded-2xl sm:h-[152px]",
            {
              ["group"]: !stageEnd && !viewMode,
            },
          )}
        >
          <Image
            src={img || ""}
            height={type === "team" ? 100 : 152}
            alt=""
            unoptimized //todo: explore the problem on the problem without it
          />

          {logo ? (
            <Image src={logo} alt="" className="absolute right-2 top-2 w-8" />
          ) : null}

          <div
            className={cn(
              "flex-center absolute bottom-0 left-0 right-0 top-[50%]",
              {
                ["blue-gradient"]: !showResult,
                ["green-gradient"]: showResult && isAnswerCorrect,
                ["red-gradient"]: showResult && !isAnswerCorrect,
              },
            )}
          >
            <Text className="absolute bottom-4 left-[50%] translate-x-[-50%] text-base">
              {text}
            </Text>
          </div>
          {!disabled && !viewMode && (
            <div className="bg-bgSecond absolute bottom-0 left-0 right-0 top-0 flex cursor-pointer items-center justify-center opacity-0 transition-all group-hover:opacity-80">
              <RefreshIcon />
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={() => !disabled && onClick && onClick()}
          className={cn(
            "border-darkGrey flex-center dashed-square group h-full flex-col rounded-lg sm:h-[152px] ",
            {
              ["cursor-pointer select-none"]: !disabled,
              ["[&>svg>path]:hover:fill-blueMain"]: !stageComing,
            },
          )}
        >
          {!disabled ? (
            <>
              <PlusIcon className="mx-auto mb-3" />
              <Text className="text-grey group-hover:text-blueMain text-xs">
                {t("pickem.nominationCardChose")}
              </Text>
            </>
          ) : null}
          {stageEnd && (
            <Text className="text-grey text-xs">
              {t("pickem.pickemDontSelected")}
            </Text>
          )}
          {stageComing && (
            // <Text className="text-grey text-xs"></Text>
            <LockIcon />
          )}
        </div>
      )}
    </div>
  );
};
