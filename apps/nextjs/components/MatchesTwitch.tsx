import cn from "classnames";
import { useLocale, useTranslations } from "next-intl";
import { memo, useState } from "react";
import { TwitchEmbed } from "react-twitch-embed";
import { LANGUAGE_LIST } from "~/constants";
import { Heading } from "./ui/Heading";
import { Select } from "./ui/Select";
import { Text } from "./ui/Text";

const streamList = [
  {
    nameStream: "PGL",
    titleSteam: "PGL",
    linkStream: "pgl",
    region: "ru",
  },
  {
    nameStream: "PGL_2",
    titleSteam: "PGL_2",
    linkStream: "pgl_cs2",
    region: "ru",
  },
  {
    nameStream: "PGL",
    titleSteam: "PGL",
    linkStream: "pgl",
    region: "en",
  },
  {
    nameStream: "PGL_2",
    titleSteam: "PGL_2",
    linkStream: "pgl_cs2",
    region: "en",
  },
];

export const MatchesTwitch = memo(() => {
  const t = useTranslations();
  const locale = useLocale();

  const [selectStream, setSelectStream] = useState(streamList[0]?.linkStream);
  const [selectRegion, setSelectRegion] = useState(locale);

  const selectItems = [
    {
      value: "ru",
      name: "Язык трансляции",
      icon: LANGUAGE_LIST["ru"].icon,
    },
    {
      value: "en",
      name: "Broadcast language",
      icon: LANGUAGE_LIST["en"].icon,
    },
  ];

  return (
    <div>
      <Heading className="mb-4 text-[28px] sm:mb-5 sm:text-4xl ">
        {t("matchesTwitch.title")}
      </Heading>
      <div className="flex flex-wrap gap-4 sm:flex-nowrap">
        <div className="bg-bgSecond w-full max-w-[auto] rounded-2xl p-6 sm:max-w-[284px]">
          <Select
            items={selectItems}
            onSelect={(val) => setSelectRegion(val)}
            selectIcon={
              LANGUAGE_LIST[selectRegion as keyof typeof LANGUAGE_LIST].icon
            }
            selectName={
              selectItems.find((i) => i.value === selectRegion)?.name || ""
            }
            className="mb-4 sm:mb-6"
            idTooltip="stream-tooltip"
          />

          {streamList
            .filter((i) => i.region === selectRegion)
            .map((stream) => {
              return (
                <div
                  onClick={() => setSelectStream(stream.linkStream)}
                  key={stream.nameStream}
                  className={cn(
                    "hover:bg-bgMain group mb-2 cursor-pointer rounded-lg p-2",
                    {
                      "bg-bgMain": stream.linkStream === selectStream,
                    },
                  )}
                >
                  <Text
                    className={cn(
                      "group-hover:text-blueMain truncate text-base font-bold",
                      {
                        "text-blueMain": stream.linkStream === selectStream,
                      },
                    )}
                  >
                    {stream.nameStream}
                  </Text>
                  <Text className="text-grey truncate text-xs">
                    {stream.titleSteam}
                  </Text>
                </div>
              );
            })}
        </div>
        <TwitchEmbed
          className="overflow-hidden rounded-2xl bg-black"
          channel={selectStream}
          darkMode
          // onAuthenticate={() => {}}
          // onVideoPause={() => {}}
          // onVideoPlay={() => {}}
          withChat={false}
          // onVideoReady={() => {}}
          autoplay={false}
        />

        {/* <Image src={streamImgPath} alt="" width={884} height={497} /> */}
      </div>
    </div>
  );
});
