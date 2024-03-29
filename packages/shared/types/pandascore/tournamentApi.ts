import { MatchApi } from "./matchApi";
import { TeamApi } from "./teamApi";

export type TournamentApi = {
  begin_at: string | null;
  detailed_stats: boolean;
  end_at: string | null;
  has_bracket: true;
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
  live_supported: true;
  matches: MatchApi[];
  modified_at: string;
  name: string;
  prizepool: string | number | null;
  serie: {
    begin_at: string;
    end_at: string;
    full_name: string;
    id: number;
    league_id: number;
    modified_at: string;
    name: string;
    season: string;
    slug: string;
    winner_id: number | null;
    winner_type: "Player" | "Team" | null;
    year: number | null;
  };
  serie_id: number;
  slug: string;
  teams: TeamApi[];
  tier: "a" | "b" | "c" | "d" | "s" | "unranked";
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
  winner_id: number | null;
  winner_type: "Player" | "Team";
};
