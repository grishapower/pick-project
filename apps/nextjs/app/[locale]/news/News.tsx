"use client";

import dayjs from "dayjs";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Heading, Text } from "~/components";
import { trpc } from "~/contexts/TRPCProvider";

import imgPath from "~/images/arts/testimg.jpeg";

export const News = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { data } = trpc.news.getAllNews.useQuery({ locale });
  return (
    <>
      <Heading className="mb-8 text-center text-4xl sm:text-left sm:text-[40px]">
        {t("news.title")}
      </Heading>
      <div className="flex flex-wrap gap-4">
        {data?.map((item) => (
          <Link
            href={`/news/${item.slug}`}
            className="bg-bgSecond max-w-[384px] cursor-pointer rounded-2xl"
          >
            <Image src={imgPath} alt="" className="rounded-2xl" />
            <div className="p-4">
              <Text className="mb-2 text-xl font-bold">{item.title}</Text>
              <Text className="mb-2 line-clamp-2 text-base">{item.text}</Text>
              <Text className="text-grey ">
                {dayjs(item.created_at).format("DD.MM.YY")}
              </Text>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
