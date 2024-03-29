import cn from "classnames";
import Image, { StaticImageData } from "next/image";
import { MedalView } from "./MedalView";
import { Text } from "./ui/Text";

type Props = {
  className?: string;
  title?: string;
  text?: string;
  img?: StaticImageData;
  level: number;
  type: "medal" | "achiev";
};

export const AchievementCard = ({
  img,
  className,
  title,
  text,
  type,
  level,
}: Props) => {
  return (
    <div
      className={cn(
        "bg-bgMain flex w-[184px] flex-col items-center justify-between rounded-2xl px-4 py-10 pb-4 text-center",
        className,
      )}
    >
      {type === "medal" ? (
        <MedalView level={level} />
      ) : (
        <Image src={img || ""} alt="" className="mb-10" />
      )}

      <div>
        {title && <Text className="text-base">{title}</Text>}
        {text && <Text className="text-grey mb-2">{text}</Text>}
      </div>
    </div>
  );
};
