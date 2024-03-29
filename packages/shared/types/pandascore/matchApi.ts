export type MatchApi = {
  begin_at: string | null;
  detailed_stats: boolean;
  draw: boolean;
  end_at: string | null;
  forfeit: boolean;
  game_advantage: number | null;
  id: number;
  live: {
    opens_at: string | null;
    supported: boolean;
    url: string | null;
  };
  match_type:
    | "all_games_played"
    | "best_of"
    | "custom"
    | "first_to"
    | "ow_best_of"
    | "red_bull_home_ground";
  modified_at: string;
  name: string;
  number_of_games: number;
  original_scheduled_at: string | null;
  rescheduled: boolean | null;
  scheduled_at: string | null;
  slug: string | null;
  status: "canceled" | "finished" | "not_started" | "postponed" | "running";
  streams_list: {
    embed_url: string | null;
    language: string | null;
    main: boolean;
    official: boolean;
    raw_url: string;
  }[];
  tournament_id: number;
  winner_id: number;
  winner_type: string;
};
