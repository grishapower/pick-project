"use client";

import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { trpc } from "~/contexts/TRPCProvider";
import { useGetSession } from "~/hooks/useGetSession";
import { BoxIcon, CupIcon, FriendsIcon, NewsIcon } from "~/images/icons";
import { CloseIcon } from "~/images/icons/CloseIcon";
import { AdBannerMobile } from "./Banners/AdBannerMobile";
import { Text } from "./ui/Text";

export const StikyMobileNav = () => {
  const session = useGetSession();
  const pathname = usePathname();

  const [showAd, setShowAd] = useState(true);

  //TODO rmeove it
  const { data, isLoading } = trpc.tournaments.getTournamentOne.useQuery();

  return (
    <div className="flex-center sticky bottom-0 z-[1] h-[60px] w-full gap-4 bg-black sm:hidden">
      <Link
        href={`/tournament/${data?.id}`}
        className={cn("text-grey group", {
          ["text-white [&>svg]:fill-white"]: pathname?.includes("/tournament"),
        })}
      >
        <CupIcon className="m-auto mb-1 group-hover:fill-white" />
        <Text className="group-hover:text-white">PGL Major</Text>
      </Link>
      {session.isAuth && (
        <>
          <Link
            href={`/profile/inventory`}
            className={cn("text-grey group", {
              ["text-white [&>svg]:fill-white"]:
                pathname?.endsWith("/inventory"),
            })}
          >
            <BoxIcon className="m-auto mb-1 group-hover:fill-white" />
            <Text className="group-hover:text-white">Инвентарь</Text>
          </Link>
          <Link
            href={`/profile/friends`}
            className={cn("text-grey group", {
              ["text-white [&>svg]:fill-white"]: pathname?.endsWith("/friends"),
            })}
          >
            <FriendsIcon className="m-auto mb-1 group-hover:fill-white" />
            <Text className="group-hover:text-white">Друзья</Text>
          </Link>
        </>
      )}

      <Link
        href={`/news`}
        className={cn("text-grey group", {
          ["text-white [&>svg]:fill-white"]: pathname?.endsWith("/news"),
        })}
      >
        <NewsIcon className="m-auto mb-1 group-hover:fill-white" />
        <Text className="group-hover:text-white">Новости</Text>
      </Link>
      {showAd && (
        <div className="absolute bottom-[60px] left-[50%] h-[50px] w-[320px] -translate-x-1/2">
          <div
            onClick={() => setShowAd(() => false)}
            className="flex-center bg-darkGrey absolute -right-[10px] -top-[10px] h-[20px] w-[20px] rounded-full"
          >
            <CloseIcon className="h-[10px] w-[10px] fill-white" />
          </div>
          <AdBannerMobile />
        </div>
      )}
    </div>
  );
};
