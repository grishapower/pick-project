export type SerieApi = {
  begin_at: string | null;
  end_at: string | null;
  full_name: string;
  id: number;
  league: {
    id: number;
    image_url: string | null;
    modified_at: string;
    name: string;
    slug: string;
    url: string | null;
  };
  league_id: number;
  modified_at: string;
  name: string | null;
  season: string | null;
  slug: string;
  tournaments: {
    begin_at: string | null;
    detailed_stats: boolean;
    end_at: string | null;
    has_bracket: boolean;
    id: number;
    league_id: number;
    live_supported: boolean;
    modified_at: string;
    name: string;
    prizepool: string | null;
    serie_id: number;
    slug: string;
    tier: "a" | "b" | "c" | "d" | "s" | "unranked";
    winner_id: number;
    winner_type: "Player" | "Team";
  }[];
  videogame: {
    id: number;
    name: string;
    slug: string;
  };
  videogame_title: {
    id: number;
    name: string;
    slug: string;
    videogame_id: number;
  };
  winner_id: number;
  winner_type: "Player" | "Team";
  year: number | null;
};
