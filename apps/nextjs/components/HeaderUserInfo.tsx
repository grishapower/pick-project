"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AuthButton } from "~/components/AuthButton";
import { UserAvatar } from "~/components/UserAvatar";
import { useGetSession } from "~/hooks/useGetSession";
import { ExitIcon } from "~/images/icons";

export const HeaderUserInfo = () => {
  const router = useRouter();

  const session = useGetSession();

  const handleClick = () => {
    router.push("/profile");
  };
  const isLogin = session.status === "authenticated";

  return (
    <div className="flex gap-1 sm:gap-4">
      {isLogin ? (
        <>
          <UserAvatar
            userPic={session.data.user?.image || ""}
            size="md"
            onClick={handleClick}
          />

          <div
            onClick={() => signOut()}
            className="bg-bgSecond flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg"
          >
            <ExitIcon />
          </div>
        </>
      ) : (
        <AuthButton adaptive />
      )}
    </div>
  );
};
