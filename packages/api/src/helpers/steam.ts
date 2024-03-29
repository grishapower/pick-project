import { SteamGetFriendsList } from "@pickem/shared";
import axios from "axios";

export const getSteamFriendsList = async (steamId: string) => {
  const { data: friendsIdsListData } = await axios.get(
    `https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=${process.env.NEXT_PRIVATE_STEAM_API_KEY}&steamid=${steamId}`,
  );
  return friendsIdsListData as SteamGetFriendsList;
};
