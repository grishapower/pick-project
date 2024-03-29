"use client";

import cn from "classnames";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import { SelectArrowIcon } from "~/images/icons";
import { Text } from "../Text";

type Props = {
  items: {
    icon?: JSX.Element;
    name: string;
    value: string;
  }[];
  onSelect: (val: string) => void;
  selectName: string;
  selectIcon: React.ReactElement;
  className?: string;
  idTooltip: string;
};

export const Select = ({
  items,
  onSelect,
  selectName,
  selectIcon,
  className,
  idTooltip,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <Tooltip
        id={idTooltip}
        openOnClick
        // place="bottom-end"
        className="bg-bgMain border-darkGrey mb-2 w-full rounded-lg border px-4"
        // style={{ padding: 24 }}
        opacity={100}
        noArrow
        disableStyleInjection
        clickable
        afterShow={() => setIsOpen((prev) => !prev)}
        afterHide={() => setIsOpen((prev) => !prev)}
      >
        {items.map((item, idx) => {
          // const test = LANGUAGE_LIST[lang];
          const lastElem = items.length - 1 === idx;

          return (
            <div
              key={item.name}
              onClick={() => onSelect(item.value)}
              className={cn("flex cursor-pointer items-center py-3", {
                ["border-darkGrey border-b"]: !lastElem,
              })}
            >
              {item?.icon}
              <Text className="text-grey ml-2 text-base">{item.name}</Text>
            </div>
          );
        })}
      </Tooltip>

      <a
        data-tooltip-id={idTooltip}
        className="border-darkGrey block cursor-pointer rounded-lg border bg-black p-4"
      >
        <div className="flex items-center">
          {selectIcon}
          <Text className="text-grey ml-2 text-base">{selectName}</Text>
          <SelectArrowIcon
            className={cn("ml-auto transition-all", {
              ["rotate-180"]: isOpen,
            })}
          />
        </div>
      </a>
    </div>
  );
};
