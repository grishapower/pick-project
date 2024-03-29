import { SteamLoginType } from "@pickem/shared";
import { DefaultUser } from "next-auth";
import { SessionContextValue, useSession } from "next-auth/react";

//TODO can i remove it and use default useSession
export const useGetSession = () => {
  const session = useSession();

  const isAuth = session.status === "authenticated";

  return {
    ...session,
    isAuth,
  } as SessionContextValue & {
    isAuth: boolean;
    data?: {
      user: DefaultUser;
      userId: string;
      steam: SteamLoginType["_json"];
      viewOnboarding: boolean;
      hasTelegram: boolean;
    } | null;
  };
};
