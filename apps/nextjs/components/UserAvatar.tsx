import cn from "classnames";

type Props = {
  userPic?: string;
  size?: "xl" | "md" | "sm";
  onClick?: () => void;
};

export const UserAvatar = ({ size, userPic, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-bgSecond flex  items-center justify-center rounded-lg",
        {
          ["h-[80px] w-[80px] sm:h-[120px] sm:w-[120px]"]: size === "xl",
          ["h-12 w-12"]: size === "md",
          ["h-8 w-8 min-w-[32px]"]: size === "sm",
          ["cursor-pointer"]: !!onClick,
        },
      )}
    >
      <img src={userPic} className="rounded-lg" />
    </div>
  );
};
