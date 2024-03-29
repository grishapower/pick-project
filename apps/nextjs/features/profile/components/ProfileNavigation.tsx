"use client";

import cn from "classnames";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CustomScrollbar, Heading } from "~/components";

export const ProfileNavigation = () => {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <div>
      <CustomScrollbar
        scrollbar={{
          autoHeight: true,
          hideTracksWhenNotNeeded: true,
          universal: true,
          className: "mb-6",
        }}
      >
        <div className="flex items-start gap-6">
          <div>
            <Link href="/profile">
              <Heading
                className={cn(
                  "hover:text-blueSecond  cursor-pointer text-base font-bold sm:text-2xl",
                  {
                    ["text-blueSecond border-blueSecond border-b-2 pb-2"]:
                      pathname?.endsWith("/profile"),
                    ["text-grey"]: !pathname?.endsWith("/profile"),
                  },
                )}
              >
                {t("profile.navigationProfile")}
              </Heading>
            </Link>
          </div>
          <div>
            <Link href="/profile/friends">
              <Heading
                className={cn(
                  "hover:text-blueSecond cursor-pointer text-base font-bold sm:text-2xl",
                  {
                    ["text-blueSecond border-blueSecond border-b-2 pb-2"]:
                      pathname?.endsWith("/friends"),
                    ["text-grey"]: !pathname?.endsWith("/friends"),
                  },
                )}
              >
                {t("profile.navigationFriends")}
              </Heading>
            </Link>
          </div>
          <div>
            <Link href="/profile/inventory">
              <Heading
                className={cn(
                  "hover:text-blueSecond  cursor-pointer text-base font-bold sm:text-2xl",
                  {
                    ["text-blueSecond border-blueSecond border-b-2 pb-2"]:
                      pathname?.endsWith("/inventory"),
                    ["text-grey"]: !pathname?.endsWith("/inventory"),
                  },
                )}
              >
                {t("profile.navigationInventory")}
              </Heading>
            </Link>
          </div>
          <div>
            <Link href="/profile/achievements">
              <Heading
                className={cn(
                  "hover:text-blueSecond cursor-pointer text-base font-bold sm:text-2xl",
                  {
                    ["text-blueSecond border-blueSecond border-b-2 pb-2"]:
                      pathname?.endsWith("/achievements"),
                    ["text-grey"]: !pathname?.endsWith("/achievements"),
                  },
                )}
              >
                {t("profile.navigationAchievment")}
              </Heading>
            </Link>
          </div>
        </div>
      </CustomScrollbar>
    </div>
  );
};
