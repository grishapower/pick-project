export type SteamGetPlayerSummaries = {
  response: {
    players: {
      avatar: string;
      avatarfull: string;
      avatarhash: string;
      avatarmedium: string;
      commentpermission: number;
      communityvisibilitystate: number;
      lastlogoff: number;
      loccountrycode: string;
      personaname: string;
      personastate: number;
      personastateflags: 0;
      primaryclanid: string;
      profilestate: 1;
      profileurl: string;
      realname: string;
      steamid: string;
      timecreated: number;
    }[];
  };
};
