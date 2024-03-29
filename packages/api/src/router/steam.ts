import axios from "axios";
import { z } from "zod";
import { getSteamFriendsList } from "../helpers/steam";
import { createTRPCRouter, publicProcedure } from "../trpc";

//TODO maybe move to steamId to cookie.

export const steamRouter = createTRPCRouter({
  getFriends: publicProcedure
    .input(z.object({ steamId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { supabase } = ctx;
      const { steamId } = input;
      //TODO MOVE URLS TO HELPERS FUNC
      const steamFriendsList = await getSteamFriendsList(steamId);

      const friendsIds = steamFriendsList.friendslist.friends.map(
        (item) => item.steamid,
      );

      const { data } = await axios.get(
        `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.NEXT_PRIVATE_STEAM_API_KEY}&steamids=${friendsIds}`,
      );

      if (!data) return false;

      const resultData: {
        avatarfull: string;
        personaname: string;
        steamid: string;
        userExists: boolean;
        pickemsParticipants: number;
      }[] = [];

      for (let i = 0; i < data.response.players.length; i++) {
        const item = data.response.players[i];
        const isUserExists = await supabase
          .from("profiles")
          .select()
          .eq("steam_id", item?.steamid)
          .single();

        let countParticipantPickems;
        if (isUserExists) {
          countParticipantPickems = await supabase
            .from("pickems")
            .select()
            .eq("steam_id", item?.steamid);
        }

        resultData.push({
          avatarfull: item.avatarfull,
          personaname: item.personaname,
          steamid: item?.steamid,
          userExists: !!isUserExists.data,
          pickemsParticipants: countParticipantPickems?.data?.length || 0,
        });
      }

      //TODO MOVE TO ANOTHER TYPE
      return resultData;
    }),
});
