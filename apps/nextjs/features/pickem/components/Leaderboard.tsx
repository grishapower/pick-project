import { Stage } from "@pickem/shared";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Fragment, useState } from "react";
import { Tooltip } from "react-tooltip";
import {
  AdBannerLeaderboard,
  Checkbox,
  CustomScrollbar,
  Heading,
  Skeleton,
} from "~/components";
import { trpc } from "~/contexts/TRPCProvider";
import { useGetSession } from "~/hooks/useGetSession";
import { FriendsIcon } from "~/images/icons";
import { STAGES_ICONS } from "../utils/stages-icon";
import { LeaderboardItem } from "./LeaderboardItem";

type Props = {
  tournamentId: string;
  stages: Stage[];
};

export const Leadeboard = ({ tournamentId, stages }: Props) => {
  const [onlyFriends, setOnlyFriends] = useState(false);

  const session = useGetSession();
  const t = useTranslations();

  //TODO: change it to stages
  const { data: leaderboardActiveData, isLoading: leaderboardActiveLoading } =
    trpc.pickems.leaderboardActive.useQuery(tournamentId);

  const { data: leaderboardData, isLoading } =
    trpc.pickems.getLeaderboard.useQuery({
      tournamentId: tournamentId,
      onlyFriends,
    });

  const toggleFriendsView = () => {
    setOnlyFriends((prev) => !prev);
  };

  const isShowSkeleton = isLoading || leaderboardActiveLoading;

  return (
    <div className="w-full overflow-hidden">
      <AdBannerLeaderboard />
      <div className="mb-2 flex flex-wrap items-center justify-between gap-0 sm:mb-5 sm:justify-start sm:gap-4 ">
        <Heading className="text-xl sm:text-[28px]">
          {t("pickem.leaderboardTitle")}
        </Heading>
        {session.isAuth && (
          <div className="bg-bgSecond rounded-lg p-2">
            <Checkbox
              checked={onlyFriends}
              label={t("pickem.leaderboardFriendsBtn")}
              onClick={toggleFriendsView}
            />
          </div>
        )}
        <Link
          href="/faq"
          target="_blank"
          className="text-lightBlue ml-0 hover:underline sm:ml-auto"
        >
          {t("pickem.leaderboardFaq")}
        </Link>
      </div>

      <div>
        <div className="mb-2 flex h-[52px] items-center gap-6 rounded-2xl bg-black px-8">
          <div className="w-full min-w-[52px] max-w-[52px]">
            {t("pickem.leaderboardTablePos")}
          </div>
          <div className="w-full max-w-[333px] truncate">
            {" "}
            {t("pickem.leaderboardTablePlayer")}
          </div>
          {stages.map((stage) => {
            return (
              <Fragment key={stage.name}>
                <a
                  data-tooltip-id={`stage-tooltip-${stage.name}`}
                  className="hidden w-full max-w-[64px] text-center sm:block [&>svg]:inline-block [&>svg]:fill-white"
                >
                  {STAGES_ICONS[stage.stageIcon as keyof typeof STAGES_ICONS]}
                </a>

                <Tooltip
                  id={`stage-tooltip-${stage.name}`}
                  place="top"
                  className="bg-bgSecond z-10 rounded-2xl p-3 shadow-[0px_4px_10px_0px_#00000040]"
                  opacity={100}
                  disableStyleInjection
                  clickable
                >
                  {stage.name}
                </Tooltip>
              </Fragment>
            );
          })}
          <div className="w-full max-w-[72px] text-right sm:text-center">
            {t("pickem.leaderboardTablePoints")}
          </div>
        </div>
        {isShowSkeleton ? (
          <>
            <Skeleton className="mb-2 h-[52px] w-full" />
            <Skeleton className="mb-2 h-[52px] w-full" />
            <Skeleton className="mb-2 h-[52px] w-full" />
            <Skeleton className="mb-2 h-[52px] w-full" />
            <Skeleton className="mb-2 h-[52px] w-full" />
          </>
        ) : null}
        <CustomScrollbar scrollbar={{ autoHeight: true, autoHeightMax: 350 }}>
          {!isShowSkeleton && leaderboardData && leaderboardData.you && (
            <LeaderboardItem
              nickname={leaderboardData.you.nickname || ""}
              points={leaderboardData.you.points!}
              answers={leaderboardData.you.answers!}
              position={leaderboardData.you.position}
              userPic={leaderboardData.you.userPic || ""}
              isYou
              isLeaderboardActive={leaderboardActiveData}
            />
          )}
          {!isShowSkeleton &&
            leaderboardData &&
            leaderboardData.list.length > 0 &&
            leaderboardData.list.map((item, idx) => {
              const isYou = session.data?.steam?.steamid === item.userSteamId;

              return (
                <LeaderboardItem
                  key={item.userSteamId}
                  nickname={item.nickname || ""}
                  points={item.points}
                  answers={item.answers}
                  position={item.position}
                  userPic={item.userPic || ""}
                  isYou={isYou}
                  isLeaderboardActive={leaderboardActiveData}
                />
              );
            })}
          {!isShowSkeleton &&
            leaderboardData &&
            leaderboardData.list.length <= 0 && (
              <div className="m-auto max-w-[250px] py-[80px] text-center ">
                <FriendsIcon className="m-auto mb-3 h-[80px] w-[80px]" />
                <Heading className="text-grey text-xl sm:text-2xl">
                  {t("pickem.leaderboardTableEmpty")}
                </Heading>
              </div>
            )}
        </CustomScrollbar>
      </div>
    </div>
  );
};
