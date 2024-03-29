import { AuthOptions } from "next-auth";
import SteamProvider, { PROVIDER_ID } from "next-auth-steam";
import { NextRequest } from "next/server";
import { getBaseUrl } from "~/utils/getBaseUrl";
import { supabaseServer } from "~/utils/supabase-server";

export function getAuthOptions(req: NextRequest): AuthOptions {
  return {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      SteamProvider(req, {
        clientSecret: process.env.NEXT_PRIVATE_STEAM_API_KEY!,
        callbackUrl: `${getBaseUrl()}/api/auth/callback`,
      }),
    ],
    // session: {
    // maxAge: 30,
    // },

    // events: {
    //   signIn: ({ account, user, profile }) => {
    //     // console.log("sign in here", account);
    //     // console.log("sign in here", user);
    //     // console.log("sign in here", profile);
    //   },
    // },
    callbacks: {
      jwt({ token, account, profile, user, session }) {
        if (account?.provider === PROVIDER_ID) {
          token.steam = profile;
        }
        return token;
      },
      //any here cuz steam data remove after
      async session({ session, token }: any) {
        const user = await supabaseServer
          .from("profiles")
          .upsert(
            {
              steam_id: token.steam?.steamid || "",
              steam_data: token?.steam,
              nickname: token?.name,
              user_pic: token?.picture,
            },
            { onConflict: "steam_id" },
          )
          .select()
          .single();

        session.userId = user?.data?.id;
        session.viewOnboarding = user?.data?.view_onboarding;
        session.hasTelegram = !!user?.data?.telegram_id;

        if ("steam" in token) {
          session.steam = token.steam;
        }

        return session;
      },
    },
  };
}
