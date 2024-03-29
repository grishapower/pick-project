"use client";

import cn from "classnames";
import { CountdownWrap, Text } from "~/components";
import { LockIcon } from "~/images/icons/LockIcon";

type Props = {
  icon: JSX.Element;
  title: string;
  desc?: string;
  onClick: () => void;
  selected?: boolean;
  locked?: boolean;
  time?: any;
  className?: string;
};

export const SidebarItemMobile = ({
  icon,
  desc,
  onClick,
  title,
  selected,
  locked,
  time,
  className,
}: Props) => {
  return (
    <div
      className={cn(
        "flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-tl-lg rounded-tr-lg px-4 py-2",
        {
          ["bg-bgMain"]: selected,
        },
      )}
      onClick={() => onClick()}
    >
      {locked ? <LockIcon /> : icon}
      <div>
        <Text
          className={cn("text-grey text-base font-bold", {
            ["text-white"]: selected,
          })}
        >
          {title}
        </Text>
        <Text
          className={cn("text-grey text-xs", {
            ["text-white"]: selected,
          })}
        >
          {desc}
          {time && <CountdownWrap date={time} wrapperClassName="ml-1" />}
        </Text>
      </div>
    </div>
  );
};
