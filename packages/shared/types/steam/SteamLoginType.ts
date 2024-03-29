export type SteamLoginType = {
  _json: {
    steamid: string;
    communityvisibilitystate: number;
    profilestate: number;
    personaname: string;
    profileurl: string;
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    avatarhash: string;
    lastlogoff: number;
    personastate: number;
    primaryclanid: string;
    timecreated: number;
    personastateflags: number;
  };
  steamid: string;
  username: string;
  name?: string;
  profile: string;
  avatar: {
    small: string;
    medium: string;
    large: string;
  };
};
