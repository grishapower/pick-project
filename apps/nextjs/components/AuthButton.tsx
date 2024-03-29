import cn from "classnames";
import { PROVIDER_ID } from "next-auth-steam";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { SteamIcon } from "~/images/icons";
import { Heading } from "./ui/Heading";

type Props = {
  className?: string;
  adaptive?: boolean;
};

export const AuthButton = ({ className, adaptive }: Props) => {
  const t = useTranslations();

  return (
    <div
      className={cn(
        "bg-lightBlue3 flex cursor-pointer items-center justify-center gap-2 rounded",
        { ["h-9 w-[180px] sm:h-12 sm:w-[240px]"]: adaptive },
        { ["h-12 w-[240px]"]: !adaptive },
        className,
      )}
      onClick={(e) => {
        signIn(PROVIDER_ID);
      }}
    >
      <Heading
        className={cn("text-base", {
          ["text-sm sm:text-base"]: adaptive,
        })}
      >
        {t("system.loginSteam")}
      </Heading>
      <SteamIcon />
    </div>
  );
};
