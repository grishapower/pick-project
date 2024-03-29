import cn from "classnames";
import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import { Text } from "~/components";
import { CheckIcon } from "~/images/icons";
import { CloseIcon } from "~/images/icons/CloseIcon";
import { FingerIcon } from "~/images/icons/FingerIcon";
import { LockIcon } from "~/images/icons/LockIcon";
import { Droppable } from "../../components/Droppable";

type Props = {
  stageEnd: boolean;
  isAnswerCorrect: boolean;
  selected: boolean;
  handleRemove: () => void;
  stage: string;
  position: string | number;
  img?: StaticImageData;
  stageDisabled: boolean;
  disabled?: boolean;
  showResult: boolean;
  viewMode?: boolean;
  size: "xl" | "sm";
  stageComing?: boolean;
  onClickSelect?: () => void;
  id?: string;
  isNowDrag: boolean;
};

export const GroupCard = ({
  stageEnd,
  isAnswerCorrect,
  selected,
  handleRemove,
  stage,
  position,
  stageDisabled,
  disabled,
  showResult,
  viewMode,
  size,
  stageComing,
  onClickSelect,
  id,
  img,
  isNowDrag,
}: Props) => {
  const t = useTranslations();

  return (
    <div
      id={id}
      className={cn("flex-center bg-bgSecond relative  rounded-2xl p-4", {
        ["h-[179px] w-full min-w-[179px] p-4 sm:h-[190px] sm:max-w-[209px]"]:
          size === "xl",
        ["h-[112px] w-[112px] p-2"]: size === "sm",

        ["bg-bgSecond"]: !showResult,
        ["red-gradient-big"]: showResult && !isAnswerCorrect,
        ["green-gradient-big"]: showResult && isAnswerCorrect && selected,
      })}
    >
      {selected || stageEnd || stageDisabled ? (
        <div>
          {!stageEnd && !viewMode && !stageDisabled ? (
            <CloseIcon
              className="fill-darkGrey absolute right-5 top-5 cursor-pointer"
              onClick={() => selected && handleRemove()}
            />
          ) : null}

          {showResult && isAnswerCorrect ? (
            <CheckIcon className="fill-green absolute right-5 top-5" />
          ) : null}
          {showResult && !isAnswerCorrect && selected ? (
            <CloseIcon className="fill-red absolute right-5 top-5" />
          ) : null}

          {(stageEnd || stageDisabled) && !selected && showResult && (
            <Text className="text-grey select-none text-center text-xs">
              {t("pickem.pickemDontSelected")}
            </Text>
          )}
          {stageComing && (
            <>
              <LockIcon className="m-auto mb-2" />
              {size === "xl" && (
                <Text className="text-grey select-none text-center text-xs">
                  {t("pickem.pickemSoonOpen")}
                </Text>
              )}
            </>
          )}
          {selected && (
            <Image
              className={cn("pointer-events-none select-none", {
                ["max-w-[112px]"]: size === "xl",
                ["max-w-[64px]"]: size === "sm",
              })}
              src={img || ""}
              alt=""
            />
          )}
        </div>
      ) : (
        <Droppable
          id={`${stage}_${position}`}
          className={cn(
            "flex-center dashed-square h-full w-full flex-col rounded-lg text-center",
            {
              ["border-red"]: disabled,
            },
          )}
          disabled={disabled}
          data={{ stage, position: position }}
          onClick={onClickSelect}
        >
          {disabled ? (
            <>
              <CloseIcon className="fill-red mx-auto mb-2" />
              <Text className="text-red mx-auto max-w-[107px] text-[12px]">
                Команда из этой группы уже выбрана
              </Text>
            </>
          ) : (
            <>
              <FingerIcon
                className={cn(" mx-auto mb-2", {
                  ["bobbingAnimation"]: isNowDrag,
                })}
              />
              {size === "xl" && (
                <>
                  <Text className="text-grey mx-auto hidden max-w-[107px] text-[12px] sm:block">
                    {t("pickem.pickemGroupCardDrag")}
                  </Text>
                  <Text className="text-grey mx-auto block max-w-[107px] text-[12px] sm:hidden">
                    {t("pickem.pickemGroupCardClick")}
                  </Text>
                </>
              )}
            </>
          )}
        </Droppable>
      )}
    </div>
  );
};
