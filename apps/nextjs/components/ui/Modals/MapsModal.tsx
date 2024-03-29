"use client";

import cn from "classnames";
import Image from "next/image";
import { PropsWithChildren } from "react";
import type { Props as ModalProps } from "react-modal";
import { CustomScrollbar } from "~/components/CustomScrollbar";
import { Text } from "~/components/ui/Text";
import { MAPS_INFO } from "~/constants";
import { BaseModal } from "./BaseModal";

type Props = {
  handleCloseModal: () => void;
  onSelect: (x: number) => void;
  selected?: number | null;
  title: string;
} & ModalProps;

export const MapsModal = ({
  isOpen,
  handleCloseModal,
  onSelect,
  selected,
  title,
}: PropsWithChildren<Props>) => {
  return (
    <BaseModal
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      title={title}
      customClassName="!sm:h-auto"
    >
      <CustomScrollbar>
        <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
          {Object.values(MAPS_INFO).map((item) => {
            const map = MAPS_INFO[item.id];

            return (
              <div
                key={map?.name}
                className={cn(
                  "relative h-[150px] w-full max-w-[150px] cursor-pointer overflow-hidden rounded-2xl border-[2px] sm:h-[184px] sm:max-w-[209px]",
                  {
                    ["border-blueMain"]: selected === map?.id,
                    ["border-bgMain"]: selected !== map?.id,
                  },
                )}
                onClick={() => onSelect(item.id)}
              >
                <Image
                  src={item.img}
                  alt=""
                  // height={209}
                  // width={184}
                  className="h-full w-full"
                />

                <div className="blue-gradient absolute bottom-0 left-0 right-0 top-[50%] z-10">
                  <Text className="absolute bottom-4 left-[50%] translate-x-[-50%] text-base capitalize">
                    {map?.name}
                  </Text>
                </div>
              </div>
            );
          })}
        </div>
      </CustomScrollbar>
    </BaseModal>
  );
};
