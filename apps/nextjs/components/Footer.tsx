"use client";

import cn from "classnames";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { DiscordIcon, LogoIcon } from "~/images/icons";
import { TelegramIcon } from "~/images/icons/TelegramIcon";
import { ChangeLocale } from "./ChangeLocale";
import { Text } from "./ui/Text";

const FOOTER_LINKS = [
  {
    title: "footer.main",
    link: "/",
  },
  {
    title: "navigation.inventory",
    link: "/profile/inventory",
  },
  {
    title: "navigation.friends",
    link: "/profile/friends",
  },
  {
    title: "footer.faq",
    link: "/faq",
  },
];

export const Footer = () => {
  const t = useTranslations();

  return (
    <footer className="bg-bgSecond relative p-8">
      <div className="inner-container">
        <div className="flex flex-wrap justify-center sm:justify-normal sm:gap-[120px]">
          <div className="mb-8 flex w-full flex-col items-center justify-between gap-4 sm:mb-0 sm:w-auto sm:items-start">
            <LogoIcon fill="#8B9094" height={48} width={"auto"} />
          </div>

          <div className="mr-[50px]">
            {FOOTER_LINKS.map(({ link, title }, idx) => (
              <Link
                key={title}
                href={link}
                className={cn(
                  "hover:text-blueSecond text-grey block text-base",
                  {
                    "mb-4": idx !== FOOTER_LINKS.length - 1,
                  },
                )}
              >
                {t(title)}
              </Link>
            ))}
          </div>

          <div>
            <Text className="text-grey mb-4 text-base">
              {t("footer.social")}
            </Text>
            <div className="bg-darkGrey flex-center hover:bg-darkBlue group mb-2 h-10 w-[140px] cursor-pointer gap-2 rounded-lg">
              <DiscordIcon className="fill-grey group-hover:fill-white" />
              <Text className="text-grey group-hover:text-white">Discord</Text>
            </div>
            <div className="bg-darkGrey flex-center hover:bg-blueMain group h-10 w-[140px] cursor-pointer gap-2 rounded-lg">
              <TelegramIcon className="fill-grey group-hover:fill-white" />
              <Text className="text-grey group-hover:text-white">Telegram</Text>
            </div>
          </div>

          <div className="mt-6 w-full sm:mt-0 sm:w-auto">
            <div className="flex flex-col items-center justify-between sm:items-start">
              {/* <div className="mb-6">
                <Link
                  href="/"
                  className="hover:text-blueSecond text-grey mb-4 block text-base"
                >
                  {t("footer.privacyPolicy")}
                </Link>
                <Link
                  href="/"
                  className="hover:text-blueSecond text-grey block text-base"
                >
                  {t("footer.agreement")}
                </Link>
              </div> */}

              <ChangeLocale />
            </div>
          </div>
        </div>
        <div className="text-grey mx-auto mt-3 max-w-[250px] text-xs sm:hidden">
          <div>Peer Software Limited</div>
          <div>
            Legal address: Trust Company Complex, Ajeltake Road, Ajeltake
            Island, Majuro,
          </div>
          <div>Republic of the Marshall Islands, MH 96960</div>
        </div>
        <Text className="text-grey mt-3 text-center text-base sm:hidden">
          Copyright © {new Date().getFullYear()}
        </Text>
      </div>
    </footer>
  );
};
