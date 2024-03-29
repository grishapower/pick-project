import cn from "classnames";
import { ReactNode } from "react";
import ClipLoader from "react-spinners/ClipLoader";

type Props = {
  className?: string;
  text?: string;
  onClick?: () => void;
  type?: "primary" | "grey" | "yellow" | "darkBlue";
  size?: "md" | "sm";
  isLoading?: boolean;
  disabled?: boolean;
  children: ReactNode;
};

//TODO ADD SIZES
export const Button = ({
  text,
  className,
  onClick,
  type = "primary",
  size = "md",
  isLoading,
  disabled,
  children,
}: Props) => {
  return (
    <button
      className={cn(
        "flex-center rounded-lg",
        {
          "bg-darkBlue": type === "darkBlue",
          "bg-blueMain": type === "primary",
          "bg-darkGrey text-grey": type === "grey",
          "bg-yellow text-black": type === "yellow",
          "h-[48px] px-6 text-xl": size === "md",
          "h-[40px] w-[152px] text-base": size === "sm",
          "cursor-not-allowed opacity-70": isLoading || disabled,
        },
        className,
      )}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading && (
        <ClipLoader
          color={"#FFF"}
          className="mr-1"
          loading={true}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}

      {text}
      {children}
    </button>
  );
};
