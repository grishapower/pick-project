export type SteamGetFriendsList = {
  friendslist: {
    friends: {
      friend_since: number;
      relationship: string;
      steamid: string;
    }[];
  };
};
