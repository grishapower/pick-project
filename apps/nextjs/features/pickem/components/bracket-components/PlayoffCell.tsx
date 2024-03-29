import cn from "classnames";
import Image, { StaticImageData } from "next/image";
import { Text } from "~/components";
import { CheckIcon } from "~/images/icons";
import { CloseIcon } from "~/images/icons/CloseIcon";

type Props = {
  isCorrectAnswer: boolean;
  isDisable: boolean;
  isCompactCards: boolean;

  teamName?: string;
  teamIcon?: StaticImageData;

  cellClick: () => void;
  closeIconClick: () => void;

  isInitialTeam: boolean;
  isShowResult: boolean;

  drawBracket?: boolean; //remove it
};

export const PlayoffCell = ({
  isCorrectAnswer,
  isDisable,
  drawBracket,
  isCompactCards,
  cellClick,
  teamName,
  teamIcon,
  isShowResult,
  isInitialTeam,
  closeIconClick,
}: Props) => {
  return (
    <div
      className={cn("playoff-team bg-bgMain relative", {
        ["green-gradient-big"]:
          !isInitialTeam && isShowResult && isCorrectAnswer,
        ["red-gradient-big"]:
          !isInitialTeam && isShowResult && !isCorrectAnswer,
        ["cursor-pointer"]: !isDisable,
        ["pointer-events-none select-none"]: isDisable,
        ["dashed-square rounded-lg"]: !isDisable && !isInitialTeam,
        ["connection-bracket"]: drawBracket,
        ["playoff-team--small"]: isCompactCards,
      })}
      onClick={!isDisable ? cellClick : () => {}}
    >
      {teamName ? (
        <>
          <Image className="h-8 w-8" src={teamIcon || ""} alt="" />

          {!isCompactCards && <Text className="truncate">{teamName}</Text>}
          {!isInitialTeam && !isDisable ? (
            <CloseIcon
              className="mr fill-darkGrey ml-auto"
              onClick={(e) => {
                e.stopPropagation();
                closeIconClick();
              }}
            />
          ) : null}
        </>
      ) : (
        isDisable &&
        isShowResult && (
          <Text className="text-grey text-xs">Не было выбрано</Text>
        )
      )}

      {!isInitialTeam && isShowResult ? (
        isCorrectAnswer ? (
          <CheckIcon className="mr ml-auto" />
        ) : (
          <CloseIcon className="fill-red mr ml-auto" />
        )
      ) : null}
    </div>
  );
};
