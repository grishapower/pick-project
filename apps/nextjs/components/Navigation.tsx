"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useGetSession } from "~/hooks/useGetSession";
import { PglMajorIcon } from "~/images/icons";

type Props = {
  newItemsLength: number;
};

export const Navigation = ({ newItemsLength }: Props) => {
  const session = useGetSession();
  const t = useTranslations();

  return (
    <nav className="hidden items-center gap-6 sm:flex">
      <Link
        href={`/tournament/pgl-major-copenhagen-2024`} //vremenno
        className="hover:text-blueSecond flex items-center gap-2 text-xl"
      >
        <PglMajorIcon width={20} height={20} />
        PGL Major
      </Link>
      <div className="bg-grey2 h-4 w-[1px]" />
      {session.isAuth && (
        <>
          <div className="relative">
            <Link
              href="/profile/inventory"
              className="hover:text-blueSecond text-xl"
            >
              {t("navigation.inventory")}
            </Link>
            {newItemsLength && newItemsLength > 0 ? (
              <div className="bg-red flex-center absolute -right-[10px] -top-[10px] h-[14px] w-4 rounded-full text-[8px]">
                +{newItemsLength}
              </div>
            ) : null}
          </div>
          <div className="bg-grey2 h-4 w-[1px]" />
          <Link
            href="/profile/friends"
            className="hover:text-blueSecond text-xl"
          >
            {t("navigation.friends")}
          </Link>
          <div className="bg-grey2 h-4 w-[1px]" />
        </>
      )}

      <Link href="/news" className="hover:text-blueSecond text-xl">
        {t("navigation.news")}
      </Link>
    </nav>
  );
};
