"use client";
import {
  useParams,
  useRouter,
  useSelectedLayoutSegments,
} from "next/navigation";
import { LANGUAGE_LIST } from "~/constants";
import { Select } from "./ui/Select";

export const ChangeLocale = () => {
  const router = useRouter();
  const params = useParams();
  const urlSegments = useSelectedLayoutSegments();

  const handleLocaleChange = (lang: string) => {
    // const newLocale = params?.locale === "ru" ? "en" : "ru";

    // This is used by the Header component which is used in `app/[locale]/layout.tsx` file,
    // urlSegments will contain the segments after the locale.
    // We replace the URL with the new locale and the rest of the segments.
    router.push(`/${lang}/${urlSegments.join("/")}`);
    router.refresh();
  };

  const languageListKeys = Object.keys(
    LANGUAGE_LIST,
  ) as (keyof typeof LANGUAGE_LIST)[];

  const items = languageListKeys.map((item) => ({
    value: item,
    name: LANGUAGE_LIST[item].name,
    icon: LANGUAGE_LIST[item].icon,
  }));

  return (
    <div className="w-full max-w-[220px]">
      <Select
        className="min-w-[150px]"
        idTooltip="lang-tooltip"
        items={items}
        onSelect={handleLocaleChange}
        selectIcon={LANGUAGE_LIST[params?.locale as "ru" | "en"].icon}
        selectName={LANGUAGE_LIST[params?.locale as "ru" | "en"].name}
      />
    </div>
  );
};
