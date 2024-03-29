"use client";

import cn from "classnames";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Text } from "~/components";

export const FaqSidebar = () => {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <div className="bg-bgSecond min-w-[284px] rounded-2xl p-6">
      <div>
        <Link
          href="/faq"
          className={cn(
            "hover:bg-bgMain mb-1 block rounded-lg px-4 py-1 text-base",
            {
              ["bg-bgMain text-blueMain"]: pathname?.endsWith("/faq"),
            },
          )}
        >
          <Text>{t("faq.answerAndQuestion")}</Text>
        </Link>
        {/* <Link
          href="/faq/privacy"
          className={cn(
            "hover:bg-bgMain mb-1 block rounded-lg px-4 py-1 text-base",
            {
              ["bg-bgMain text-blueMain"]: pathname?.endsWith("/privacy"),
            },
          )}
        >
          <Text>{t("faq.policy")}</Text>
        </Link>
        <Link
          href="/faq/agreement"
          className={cn(
            "hover:bg-bgMain mb-1 block rounded-lg px-4 py-1 text-base",
            {
              ["bg-bgMain text-blueMain"]: pathname?.endsWith("/agreement"),
            },
          )}
        >
          <Text>{t("faq.agreement")}</Text>
        </Link> */}
      </div>
    </div>
  );
};
