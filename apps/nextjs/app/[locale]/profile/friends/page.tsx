"use client";

import cn from "classnames";
import { useTranslations } from "next-intl";
import { Skeleton, Text } from "~/components";
import { trpc } from "~/contexts/TRPCProvider";
import { useGetSession } from "~/hooks/useGetSession";
import { pluralize } from "~/utils/pluralize";

export default function ProfilePage() {
  const session = useGetSession();
  const t = useTranslations();

  const { data, isLoading } = trpc.steam.getFriends.useQuery(
    { steamId: session.data?.steam?.steamid! },
    { enabled: Boolean(session.data?.steam?.steamid) },
  );

  return (
    <div className="border-border flex flex-col overflow-hidden">
      {isLoading ? (
        <div className="flex flex-wrap justify-between gap-3">
          <Skeleton className="h-[66px] w-[20%]" />
          <Skeleton className="h-[66px] w-[20%]" />
          <Skeleton className="h-[66px] w-[20%]" />
          <Skeleton className="h-[66px] w-[20%]" />
          <Skeleton className="h-[66px] w-[20%]" />
          <Skeleton className="h-[66px] w-[20%]" />
          <Skeleton className="h-[66px] w-[20%]" />
          <Skeleton className="h-[66px] w-[20%]" />
        </div>
      ) : null}

      {!isLoading && data && data?.length > 0 ? (
        <>
          <div className="mb-8 flex flex-wrap justify-center gap-3 sm:justify-start">
            {data
              // .filter((i) => i.userExists)
              .sort((a, b) => Number(b.userExists) - Number(a.userExists))
              .map((player) => (
                <div
                  className={cn(
                    "bg-bgSecond flex w-full max-w-[155px] gap-4 rounded-lg p-2 sm:max-w-[284px]",
                    {
                      ["border-blueSecond border"]: player.userExists,
                    },
                  )}
                  key={player?.steamid}
                >
                  <img
                    src={player.avatarfull}
                    alt=""
                    className="h-12 w-12 rounded"
                  />
                  <div className="truncate">
                    <Text
                      className={cn("truncate text-base font-bold", {
                        ["text-grey"]: !player.userExists,
                      })}
                    >
                      {player.personaname}
                    </Text>
                    {player.userExists && (
                      <Text className="text-grey truncate text-xs">
                        {t("profile.profileFriendsParticipantText")}
                        {player.pickemsParticipants}{" "}
                        {pluralize(player.pickemsParticipants, [
                          t("profile.profileFriendsParticipantOne"),
                          t("profile.profileFriendsParticipantFew"),
                          t("profile.profileFriendsParticipantFew"),
                        ])}
                      </Text>
                    )}
                  </div>
                </div>
              ))}
          </div>
          {/* <Heading className="mb-4 text-[28px]">Можно пригласить</Heading>
          <div className="flex flex-wrap justify-between gap-3">
            {data
              .filter((i) => !i.userExists)
              .map((player) => (
                <div
                  className={cn(
                    "bg-bgSecond flex w-[20%] gap-4 rounded-lg p-2",
                    {
                      ["border-blueSecond border"]: player.userExists,
                    },
                  )}
                  key={player?.steamid}
                >
                  <img
                    src={player.avatarfull}
                    alt=""
                    className="h-12 w-12 rounded"
                  />
                  <Text className="text-base font-bold">
                    {player.personaname}
                  </Text>
                </div>
              ))}
          </div> */}
        </>
      ) : null}
    </div>
  );
}
