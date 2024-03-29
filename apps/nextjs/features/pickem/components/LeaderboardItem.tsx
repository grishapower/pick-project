import cn from "classnames";
import { useTranslations } from "next-intl";
import { Text, UserAvatar } from "~/components";
import { MedalIcon, ScoreIcon } from "~/images/icons";

type Props = {
  userPic: string | null;
  nickname: string | null;
  points: number;
  answers: {
    [x: number]: {
      all: number;
      right: number;
    };
  };
  isYou: boolean;
  position: number;
  isLeaderboardActive?: boolean;
};

export const LeaderboardItem = ({
  userPic,
  nickname,
  points,
  answers,
  isYou,
  position,
  isLeaderboardActive,
}: Props) => {
  const t = useTranslations();

  return (
    <div
      className={cn(
        "bg-bgSecond relative mb-2 flex h-[52px] items-center gap-6 overflow-hidden rounded-2xl px-8",
        {
          ["bg-darkGrey"]: isYou,
        },
      )}
    >
      {(position === 1 || position === 2 || position === 3) &&
      isLeaderboardActive ? (
        <div
          className={cn(
            "absolute left-0 z-0 flex h-full w-[108px] items-center pl-3",
            {
              ["gold-gradient"]: position === 1,
              ["silver-gradient"]: position === 2,
              ["copper-gradient"]: position === 3,
            },
          )}
        >
          <MedalIcon
            className={cn("relative z-10", {
              ["fill-gold"]: position === 1,
              ["fill-silver"]: position === 2,
              ["fill-red"]: position === 3,
            })}
          />
        </div>
      ) : null}

      <div className="w-full min-w-[25px] max-w-[52px] text-center sm:min-w-[52px]">
        {position}
      </div>
      <div className="flex w-full max-w-[150px] items-center gap-2 sm:max-w-[333px]">
        <UserAvatar userPic={userPic || ""} size="sm" />
        <Text className="max-w-[100px] truncate text-base sm:max-w-[150px]">
          {nickname}
        </Text>
        {isYou ? (
          <Text className="text-blueMain whitespace-nowrap">
            {t("pickem.leaderboardTableYou")}
          </Text>
        ) : null}
      </div>

      {Object.values(answers).map((item) => {
        return (
          <div className="hidden w-full max-w-[64px] sm:block">
            <Text className="text-center text-base">
              {isLeaderboardActive ? (
                <>
                  {t("pickem.leaderboardTableCountPoints", {
                    right: item.right,
                    all: item.all,
                  })}
                </>
              ) : null}
            </Text>
          </div>
        );
      })}

      <div className="ml-auto flex w-full max-w-[72px] items-center justify-end gap-1 text-center">
        {isLeaderboardActive ? points : 0}
        <ScoreIcon />
      </div>
    </div>
  );
};
