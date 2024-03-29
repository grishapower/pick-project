"use client";

import cn from "classnames";
import { useTranslations } from "next-intl";
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
  active?: boolean;
  end?: boolean;
};

export const SibebarItem = ({
  icon,
  desc,
  onClick,
  title,
  selected,
  locked,
  time,
  className,
  active,
  end,
}: Props) => {
  const t = useTranslations();
  return (
    <div
      onClick={() => onClick()}
      className={cn(
        "hover:bg-bgMain group relative w-full cursor-pointer rounded-lg p-2",
        className,
        {
          ["bg-bgMain"]: selected,
          ["bg-bgSecond"]: !selected,
        },
      )}
    >
      {active && (
        <div className="bg-green absolute right-1 top-1 rounded px-1 py-[2px] text-xs">
          {t("pickem.sidebarItemCurrent")}
        </div>
      )}
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "bg-darkGrey group-hover:bg-bgBlue [&>svg>path]:group-hover:fill-blueSecond flex h-10 w-10 items-center justify-center rounded-lg",
            {
              ["bg-bgBlue [&>svg>path]:fill-blueSecond"]: selected && !locked,
              ["bg-darkGrey"]: !selected,
            },
          )}
        >
          {locked ? <LockIcon /> : icon}
        </div>
        <div>
          <Text
            className={cn("group-hover:text-blueMain text-base font-bold", {
              ["text-blueMain"]: selected,
              ["text-grey"]: locked || end,
            })}
          >
            {title}
          </Text>
          <Text className="text-grey text-xs">
            {desc}

            {time && <CountdownWrap date={time} wrapperClassName="ml-1" />}
          </Text>
        </div>
      </div>
    </div>
  );
};
