import { PlayerApi } from "./playerApi";

export type TeamApi = {
  acronym: string | null;
  id: number;
  image_url: string | null;
  location: string | null;
  modified_at: string;
  name: string;
  slug: string | null;
  players: PlayerApi[];
};
