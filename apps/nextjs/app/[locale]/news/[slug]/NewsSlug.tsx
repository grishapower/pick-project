"use client";

import dayjs from "dayjs";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Heading, Text } from "~/components";
import { trpc } from "~/contexts/TRPCProvider";
import imgPath from "~/images/arts/testimg.jpeg";

export const NewsSlug = () => {
  const params = useParams();
  const locale = useLocale();
  const slug = params!.slug as string;

  const { data } = trpc.news.getNewsBySlug.useQuery({ slug, locale });

  return (
    <div className="mx-auto max-w-[784px]">
      <Heading className="mb-8 text-center text-4xl sm:text-left sm:text-[40px]">
        {data?.title}
      </Heading>
      <div className="bg-bgSecond max-w-[784px] rounded-2xl">
        <Image src={imgPath} alt="" className="max-h-[312px] rounded-2xl" />
        <div className="px-4 py-6">
          <Text className="mb-2 text-xl font-bold">{data?.title}</Text>
          <Text className="mb-2 text-base">{data?.text}</Text>
          <Text className="text-grey ">
            {dayjs(data?.date).format("DD.MM.YY")}
          </Text>
        </div>
      </div>
    </div>
  );
};
