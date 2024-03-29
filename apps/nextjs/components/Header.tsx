"use client";

import Link from "next/link";
import { trpc } from "~/contexts/TRPCProvider";
import { useGetSession } from "~/hooks/useGetSession";
import { LogoIcon } from "~/images/icons";
import { HeaderUserInfo } from "./HeaderUserInfo";
import { Navigation } from "./Navigation";
import { Notifications } from "./Notifications";

export const Header = () => {
  const session = useGetSession();

  const { data: newItemsLength } = trpc.inventory.getNewInventoryItems.useQuery(
    undefined,
    { enabled: Boolean(session.data?.userId) },
  );

  return (
    <header className="sm:bg-bgMain bg-black px-4 py-2 sm:sticky sm:top-0 sm:z-[2] md:px-8 md:py-5">
      <div className="container relative flex items-center justify-between">
        <div className="flex w-[150px] items-center sm:w-auto">
          <Link href="/">
            <LogoIcon className="h-[48px] w-full" />
          </Link>
        </div>

        <Navigation newItemsLength={newItemsLength || 0} />

        <div className="flex gap-1 sm:gap-4">
          {session.isAuth && <Notifications />}

          <HeaderUserInfo />
        </div>
      </div>
    </header>
  );
};
