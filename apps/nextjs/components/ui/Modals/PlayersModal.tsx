"use client";

import cn from "classnames";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { PropsWithChildren, useMemo, useState } from "react";
import type { Props as ModalProps } from "react-modal";
import { CustomScrollbar } from "~/components/CustomScrollbar";
import { TEAMS_INFO } from "~/constants";
import { Player, PLAYERS_INFO } from "~/constants/players-info";
import { Input } from "../Input";
import { Text } from "../Text";
import { BaseModal } from "./BaseModal";

type Props = {
  handleCloseModal: () => void;
  onSelect: (x: number) => void;
  selected?: number | null;
  title: string;
  teams: number[];
} & ModalProps;

export const PlayersModal = ({
  isOpen,
  handleCloseModal,
  onSelect,
  selected,
  title,
  teams,
}: PropsWithChildren<Props>) => {
  const t = useTranslations();

  const [inputValue, setInputValue] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<number>();

  const handleChange = (value: string) => {
    setInputValue(value.toLowerCase());
  };

  const handleSelectTeam = (id: number) => {
    setSelectedTeam(id === selectedTeam ? undefined : id);
  };

  let allPlayersListArr: Player[] = [];

  teams.forEach((teamId) => {
    TEAMS_INFO[teamId]?.players?.forEach((player) => {
      allPlayersListArr.push(PLAYERS_INFO[player]!);
    });
  });

  const allPlayersList = teams.reduce((acc, team) => {
    acc = [...acc, ...(TEAMS_INFO[team]?.players || [])];
    return acc;
  }, [] as number[]);

  const filterAllPlayers = useMemo(() => {
    const test = allPlayersListArr.filter(
      (player) =>
        player?.nickname?.toLowerCase()?.includes(inputValue) &&
        (selectedTeam ? player.team === selectedTeam : true),
    );

    return test;
  }, [allPlayersList, inputValue, selectedTeam]);

  return (
    <BaseModal
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      title={title}
    >
      <div className="flex h-full flex-col">
        <div className="mb-3">
          <Input
            showIcon
            wrapperClassName="mb-4"
            onChange={handleChange}
            value={inputValue}
            placeholder={t("pickem.playersModalPlaceholder")}
          />
          <CustomScrollbar scrollbar={{ autoHeight: true }}>
            <div className="flex-center gap-[10px] pb-2">
              {teams.map((team) => (
                <div
                  key={team}
                  className={cn(
                    "bg-bgSecond flex-center h-10 w-[40px] cursor-pointer rounded-[4px] p-1",
                    {
                      ["border-blueMain border"]: team === selectedTeam,
                    },
                  )}
                  onClick={() => handleSelectTeam(team)}
                >
                  <Image
                    src={TEAMS_INFO[team]?.icon || ""}
                    alt=""
                    className="h-full"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </CustomScrollbar>
        </div>

        <CustomScrollbar>
          <div className="flex flex-wrap justify-center gap-4">
            {filterAllPlayers.map((player) => {
              return (
                <div
                  key={player.nickname}
                  className={cn(
                    "bg-bgSecond relative h-[150px] w-full max-w-[150px] cursor-pointer overflow-hidden rounded-2xl border-[2px]",
                    {
                      ["border-blueMain"]: selected === player.id,
                      ["border-bgMain"]: selected !== player.id,
                    },
                  )}
                  onClick={() => onSelect(player.id)}
                >
                  <div className="absolute right-4 top-4 z-[1]">
                    {
                      <Image
                        src={TEAMS_INFO[player.team]?.icon || ""}
                        alt=""
                        className="h-8 w-8"
                      />
                    }
                  </div>

                  <Image
                    src={player.image || ""}
                    alt=""
                    className="h-full w-full"
                    unoptimized //todo: explore the problem on the problem without it
                    // height={145}
                    // width={145}
                  />
                  <div className="blue-gradient absolute bottom-0 left-0 right-0 top-[50%] z-10">
                    <Text className="absolute bottom-4 left-[50%] translate-x-[-50%] text-base">
                      {player.nickname}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>
        </CustomScrollbar>
      </div>
    </BaseModal>
  );
};
