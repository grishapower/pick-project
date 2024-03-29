"use client";

import cn from "classnames";
import Image from "next/image";
import { PropsWithChildren } from "react";
import type { Props as ModalProps } from "react-modal";
import { CustomScrollbar } from "~/components/CustomScrollbar";
import { TEAMS_INFO } from "~/constants";
import { BaseModal } from "./BaseModal";

type Props = {
  handleCloseModal: () => void;
  onSelect: (x: number) => void;
  selected?: number | null;
  title: string;
  teams: number[];
} & ModalProps;

export const TeamsModal = ({
  isOpen,
  handleCloseModal,
  onSelect,
  selected,
  title,
  teams,
}: PropsWithChildren<Props>) => {
  return (
    <BaseModal
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      title={title}
    >
      <div style={{ height: "calc(100%)" }}>
        <CustomScrollbar
          scrollbar={
            {
              // className: "test bg-bgYellow",
              // autoHeight: true,
              // autoHeightMax: 500,
              // autoHeightMin: 300,
            }
          }
        >
          <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
            {teams.map((team) => {
              return (
                <>
                  <div
                    className={cn(
                      "flex-center relative h-[150px] w-full max-w-[150px] cursor-pointer overflow-hidden rounded-2xl border-[2px] sm:max-w-[160px]",
                      {
                        ["border-blueMain"]: selected === team,
                        ["border-darkGrey"]: selected !== team,
                      },
                    )}
                    onClick={() => onSelect(team)}
                  >
                    <Image
                      src={TEAMS_INFO[team]?.icon || ""}
                      alt=""
                      height={100}
                      width={100}
                      className=""
                    />
                    {/* <div className="blue-gradient absolute bottom-0 left-0 right-0 top-0 z-10">
                      <Text className="absolute bottom-4 left-[50%] translate-x-[-50%] whitespace-nowrap text-base capitalize">
                        {TEAMS_INFO[team]?.name}
                      </Text>
                    </div> */}
                  </div>
                </>
              );
            })}
          </div>
        </CustomScrollbar>
      </div>
    </BaseModal>
  );
};
