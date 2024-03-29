"use client";

import cn from "classnames";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Heading, Text } from "~/components";
import { trpc } from "~/contexts/TRPCProvider";
import { AdminAnswerTab } from "~/features/admin/components/AdminAnswerTab";
import { AdminBracketTab } from "~/features/admin/components/AdminBracketTab";
import { AdminControlTab } from "~/features/admin/components/AdminControlTab";
import { AdminNotificationTab } from "~/features/admin/components/AdminNotificationTab";
import { AdminPrizeTab } from "~/features/admin/components/AdminPrizeTab";
import { AdminStageTab } from "~/features/admin/components/AdminStageTab";
import { useGetSession } from "~/hooks/useGetSession";

export const AdminIdPage = () => {
  const params = useParams();
  const tournamentId = params!.id as string;
  const session = useGetSession();

  const [currentTab, setCurrentTab] = useState<
    "stage" | "bracket" | "prize" | "control" | "answer" | "notification"
  >("bracket");

  const [mainInfo, setMainInfo] = useState({
    full_name: "",
    name: "",
    img: "",
    open: false,
    end_date: "",
    start_date: "",
  });

  //query
  const { data: tournamentData } = trpc.tournaments.getTournamentById.useQuery({
    tournamentId,
  });

  const {
    mutate: updateInfoTournamentMutate,
    isLoading: isLoadingUpdateInfoTournamentMutate,
  } = trpc.admin.updateInfoTournament.useMutation();

  useEffect(() => {
    if (tournamentData) {
      const { full_name, name, img, open, end_date, start_date } =
        tournamentData;
      setMainInfo({
        full_name,
        name,
        img,
        open,
        end_date,
        start_date,
      });
    }
  }, [tournamentData]);

  if (!tournamentData) {
    return <div>Такого турнира не существует</div>;
  }

  const tournamentDataKeys = Object.keys(mainInfo) as (keyof typeof mainInfo)[];

  return (
    <div>
      <Heading className="mb-4 text-3xl">
        Настройка турнира:
        <span className="ml-3 text-5xl">{tournamentData.full_name}</span>
      </Heading>
      <div className="mb-4">
        <Text className="text-xl">Информация о турнире</Text>
        <div className="mb-3 flex flex-wrap gap-4">
          {tournamentDataKeys.map((item) => {
            if (item === "open") {
              return (
                <div key={item}>
                  <div>{item}</div>
                  <input
                    className="text-black"
                    type="checkbox"
                    checked={mainInfo[item]}
                    onChange={(e) => {
                      setMainInfo((prev) => ({
                        ...prev,
                        ["open"]: !prev.open,
                      }));
                    }}
                  />
                </div>
              );
            }
            return (
              <div key={item}>
                <div>{item}</div>
                <input
                  className="text-black"
                  value={mainInfo[item]}
                  onChange={(e) => {
                    setMainInfo((prev) => ({
                      ...prev,
                      [item]: e.target.value,
                    }));
                  }}
                />
              </div>
            );
          })}
        </div>
        <Button
          onClick={() =>
            updateInfoTournamentMutate({ tournamentId, data: mainInfo })
          }
          isLoading={isLoadingUpdateInfoTournamentMutate}
        >
          Изменить информацию о турнире
        </Button>
      </div>

      <div className="mb-4 flex gap-2">
        <div
          onClick={() => setCurrentTab("control")}
          className={cn("cursor-pointer rounded-md border p-5 text-lg", {
            ["bg-lightBlue3"]: currentTab === "control",
          })}
        >
          Управление
        </div>
        <div
          onClick={() => setCurrentTab("stage")}
          className={cn("cursor-pointer rounded-md border p-5 text-lg", {
            ["bg-lightBlue3"]: currentTab === "stage",
          })}
        >
          Настройка стадий
        </div>
        <div
          onClick={() => setCurrentTab("bracket")}
          className={cn("cursor-pointer rounded-md border p-5 text-lg", {
            ["bg-lightBlue3"]: currentTab === "bracket",
          })}
        >
          Настройка Сеток
        </div>
        <div
          onClick={() => setCurrentTab("prize")}
          className={cn("cursor-pointer rounded-md border p-5 text-lg", {
            ["bg-lightBlue3"]: currentTab === "prize",
          })}
        >
          Настройка Призов
        </div>
        <div
          onClick={() => setCurrentTab("answer")}
          className={cn("cursor-pointer rounded-md border p-5 text-lg", {
            ["bg-lightBlue3"]: currentTab === "answer",
          })}
        >
          Настройка Ответов
        </div>
        <div
          onClick={() => setCurrentTab("notification")}
          className={cn("cursor-pointer rounded-md border p-5 text-lg", {
            ["bg-lightBlue3"]: currentTab === "notification",
          })}
        >
          Настройка Уведомлений
        </div>
      </div>
      {currentTab === "control" && <AdminControlTab />}
      {currentTab === "stage" && <AdminStageTab />}
      {currentTab === "bracket" && <AdminBracketTab />}
      {currentTab === "prize" && <AdminPrizeTab />}
      {currentTab === "answer" && <AdminAnswerTab />}
      {currentTab === "notification" && <AdminNotificationTab />}
    </div>
  );
};
