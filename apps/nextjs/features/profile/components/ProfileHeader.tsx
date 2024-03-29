"use client";

import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { Heading, Text, UserAvatar } from "~/components";
import { trpc } from "~/contexts/TRPCProvider";
import { useGetSession } from "~/hooks/useGetSession";
import { pluralize } from "~/utils/pluralize";

export const ProfileHeader = () => {
  const session = useGetSession();
  const t = useTranslations();

  const { data: userData } = trpc.profile.getUserInfo.useQuery(undefined, {
    enabled: Boolean(session.data?.userId),
  });
  const { data: countPickems } = trpc.pickems.getCountUserPickems.useQuery(
    undefined,
    { enabled: Boolean(session.data?.userId) },
  );

  return (
    <div className="bg-bgSecond mb-6 flex flex-wrap justify-center rounded-2xl p-6  sm:justify-between">
      <div className="flex-center mb-7 flex-wrap sm:mb-0">
        <UserAvatar size="xl" userPic={session.data?.steam?.avatarfull} />
        <Heading className="ml-4 max-w-[500px] truncate text-center text-2xl leading-tight sm:text-left sm:text-[40px]">
          {session.data?.user?.name}
        </Heading>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-center">
          <Text className="text-base font-bold">
            {countPickems}{" "}
            {pluralize(countPickems || 0, [
              t("profile.headerTournamentOne"),
              t("profile.headerTournamentFew"),
              t("profile.headerTournamentMany"),
            ])}
          </Text>
          <Text className="text-grey text-xs">
            {t("profile.headerParticipantsText")}
          </Text>
        </div>
        <div className="bg-darkGrey h-6 w-[2px]" />
        <div className="text-center">
          <Text className="text-base font-bold">
            {dayjs(userData?.created_at).format("DD.MM.YYYY")}
          </Text>
          <Text className="text-grey text-xs">
            {t("profile.headerRegistrationText")}
          </Text>
        </div>
      </div>
    </div>
  );
};
