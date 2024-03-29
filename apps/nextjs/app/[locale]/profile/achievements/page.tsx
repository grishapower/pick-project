"use client";

import cn from "classnames";
import { useTranslations } from "next-intl";
import { Heading, MedalView, Skeleton, Text } from "~/components";
import { trpc } from "~/contexts/TRPCProvider";
import { EmptyAchiev } from "~/images/icons/EmptyAchiev";

export default function AchievementsPage() {
  const t = useTranslations();

  const { data: achievmentData, isLoading } =
    trpc.achievment.getUserAchievment.useQuery();

  return (
    <div>
      <div>
        {isLoading && (
          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-[265px] w-[184px]" />
            <Skeleton className="h-[265px] w-[184px]" />
            <Skeleton className="h-[265px] w-[184px]" />
          </div>
        )}
        {achievmentData && !isLoading && achievmentData.length > 0 && (
          <>
            {achievmentData.map(({ achievList, name }) => {
              return (
                <>
                  <Heading className="mb-4 text-[28px]">{name}</Heading>
                  <div>
                    {achievList.map((achiev) => {
                      return (
                        <div
                          className={cn(
                            "bg-bgSecond flex w-[184px] flex-col items-center justify-between rounded-2xl px-4 py-10 pb-4 text-center",
                          )}
                        >
                          <div className="mb-4">
                            <MedalView level={achiev.level} />
                          </div>

                          <div>
                            <Text className="text-base font-bold">
                              {t("achievment.medalTitle")}
                            </Text>
                            <Text className="text-grey mb-2">
                              {t("achievment.medalText")}
                            </Text>
                            <Text className="text-bgBlue text-xl">
                              {t("achievment.medalCount", {
                                right: achiev.level,
                                all: achiev.allLevel,
                              })}
                            </Text>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </>
        )}

        {achievmentData && !isLoading && !achievmentData.length && (
          <div className="m-auto py-[80px] text-center">
            <EmptyAchiev className="m-auto mb-3" />
            <Heading className="text-grey text-2xl">
              {t("achievment.empty")}
            </Heading>
          </div>
        )}
      </div>
    </div>
  );
}
