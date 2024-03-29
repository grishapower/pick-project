"use client";

import { PickemData, TOURNAMENT_STATUS_ENUM } from "@pickem/shared";
import { useState } from "react";
import {
  Button,
  CustomScrollbar,
  Heading,
  Input,
  Skeleton,
  Text,
  UserAvatar,
} from "~/components";

import cn from "classnames";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import relativeTime from "dayjs/plugin/relativeTime";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Tooltip } from "react-tooltip";
import { trpc } from "~/contexts/TRPCProvider";
import {
  PickemContent,
  PickemHeaderMobile,
  PickemSidebar,
  PICKEM_ITEMS,
  StatusTag,
} from "~/features/pickem";
import { useGetSession } from "~/hooks/useGetSession";
import { useGetUserGeo } from "~/hooks/useGetUserGeo";
import { CloseIcon } from "~/images/icons/CloseIcon";

//maybe move  main layout
dayjs.locale("ru");
dayjs.extend(relativeTime);

export const TournamentSlugPage = () => {
  const t = useTranslations();
  const locale = useLocale();
  const session = useGetSession();
  const params = useParams();
  const geo = useGetUserGeo();
  const tournamentSlug = params!.slug as string;

  const [inputValue, setInputValue] = useState("");
  const [friendPickem, setFriendPickem] = useState<{
    id: string;
    nickname: string | null;
    userPic: string | null;
    pickem: PickemData;
  }>();

  const [selectedItem, setSelectedItem] = useState<PICKEM_ITEMS | string>(
    PICKEM_ITEMS.Main,
  );

  const { data: pickemFullData, isLoading } =
    trpc.pickems.getPickemBySlug.useQuery(
      {
        locale,
        slug: tournamentSlug,
        region: geo,
      },
      { enabled: Boolean(geo) },
    );

  const { data: friendsInPickem } = trpc.pickems.getFriendsPickem.useQuery(
    undefined,
    {
      enabled: Boolean(session.data?.userId),
    },
  );

  const handleClickItem = (itemName: PICKEM_ITEMS | string) => {
    setSelectedItem(itemName);
  };

  if (isLoading) {
    return (
      <>
        {/* desktop */}
        <div className="hidden gap-4 sm:flex">
          <div className="bg-bgSecond max-h-[650px] min-w-[284px] gap-4 rounded-2xl p-6">
            <div className="mb-3">
              <Skeleton className="h-[56px] w-full" />
            </div>
            <div className="mb-3">
              <Skeleton className="h-[56px] w-full" />
            </div>
            <div className="mb-3">
              <Skeleton className="h-[56px] w-full" />
            </div>
            <div className="mb-3">
              <Skeleton className="h-[56px] w-full" />
            </div>
            <div className="mb-3">
              <Skeleton className="h-[56px] w-full" />
            </div>
          </div>
          <Skeleton className="w-full rounded-2xl" />
        </div>

        {/* mobile */}
        <div className="block gap-4 sm:hidden">
          <Skeleton className="mb-5 h-[225px] w-full rounded-2xl" />
          <Skeleton className="h-[400px] w-full rounded-2xl" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-6 hidden items-center justify-between sm:flex">
        <div className="gap-3">
          <div className="mb-2 flex items-center">
            <Heading className="truncate text-center text-[40px] leading-tight">
              {pickemFullData?.tournament?.name}
            </Heading>
          </div>
          <StatusTag stagesData={pickemFullData?.stages || []} />
        </div>

        {session.isAuth && (
          <>
            {!friendPickem ? (
              <>
                <a data-tooltip-id="my-tooltip">
                  <Button size="sm">{t("pickem.friendsPickem")}</Button>
                </a>

                <Tooltip
                  id="my-tooltip"
                  openOnClick
                  place="bottom-end"
                  className="bg-bgSecond z-10 w-[300px] rounded-2xl p-4 shadow-[0px_4px_10px_0px_#00000040]"
                  opacity={100}
                  noArrow
                  disableStyleInjection
                  clickable
                >
                  <div>
                    <Input
                      onChange={(val) => setInputValue(val)}
                      value={inputValue}
                      placeholder={t("pickem.friendsPickemPlaceholder")}
                      wrapperClassName="mb-4"
                    />
                    <CustomScrollbar
                      scrollbar={{
                        autoHeight: true,
                        hideTracksWhenNotNeeded: true,
                      }}
                    >
                      {friendsInPickem && friendsInPickem.length > 0 ? (
                        friendsInPickem
                          .filter((i) =>
                            i.nickname?.includes(
                              inputValue.toLocaleLowerCase(),
                            ),
                          )
                          .map((friend) => (
                            <div
                              className="max-h-[256px] overflow-y-auto "
                              key={friend.id}
                            >
                              <div
                                className={cn(
                                  "hover:bg-bgMain flex cursor-pointer items-center gap-4 rounded-lg p-2",
                                )}
                                onClick={() => setFriendPickem(friend)}
                              >
                                <UserAvatar
                                  size="md"
                                  userPic={friend.userPic || ""}
                                />
                                <div>
                                  <Text
                                    className={cn(
                                      "max-w-[170px] truncate text-base font-bold",
                                    )}
                                  >
                                    {friend.nickname}
                                  </Text>
                                  <Text className="text-grey text-xs">
                                    {!!friend.pickem
                                      ? t("pickem.friendsPickemActive")
                                      : t("pickem.friendsPickemNoActive")}
                                  </Text>
                                </div>
                              </div>
                            </div>
                          ))
                      ) : (
                        <Text className="text-darkGrey text-center text-sm">
                          {t("pickem.friendsPickemEmpty")}
                        </Text>
                      )}
                    </CustomScrollbar>
                  </div>
                </Tooltip>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="bg-bgSecond rounded-lg p-3">
                  <Text className="truncate text-base">
                    {t("pickem.friendsPickemView")} {friendPickem.nickname}
                  </Text>
                </div>
                <Button
                  className="!w-10 !px-0"
                  size="sm"
                  onClick={() => setFriendPickem(undefined)}
                >
                  <CloseIcon fill="white" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <PickemHeaderMobile
        selectedItem={selectedItem}
        setItem={handleClickItem}
        stagesData={pickemFullData?.stages || []}
        title={pickemFullData?.tournament?.name}
      />

      <div className="items-start gap-4 sm:flex">
        <div className="hidden sm:block">
          <PickemSidebar
            selectedItem={selectedItem}
            setItem={handleClickItem}
            stagesData={pickemFullData?.stages || []}
          />
        </div>

        <div className="w-full ">
          <PickemContent
            tournamentName={pickemFullData?.tournament?.name || ""}
            selectedItem={selectedItem}
            tournamentStatus={
              pickemFullData?.tournament?.tournamentStatus ||
              TOURNAMENT_STATUS_ENUM["Upcoming"]
            }
            tournamentId={pickemFullData?.tournament?.id || ""}
            stagesData={pickemFullData?.stages || []}
            userPickemData={
              friendPickem ? friendPickem.pickem : pickemFullData?.userPickem
            }
            initialBrackets={pickemFullData?.brackets}
            prizes={pickemFullData?.prizes || []}
            correctAnswers={pickemFullData?.answers}
            viewMode={!!friendPickem}
            tasksData={pickemFullData?.tasks || []}
            medalData={pickemFullData?.medal}
          />
        </div>
      </div>
    </>
  );
};
