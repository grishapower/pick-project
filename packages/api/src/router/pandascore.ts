import { SerieApi, TeamApi, TournamentApi } from "@pickem/shared";
import axios from "axios";
import _groupBy from "lodash.groupby";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const PANDASCORE_TOKEN_API =
  "9J48Fvs1Ozvxb_h7DqtD6nAss0dN_usrrzXg5-fbijMbzzXRxyA";

const defaultOptions = {
  headers: {
    Authorization: `Bearer ${PANDASCORE_TOKEN_API}`,
  },
  params: {
    "filter[tier]": "s,a",
    "filter[videogame_title]": "cs-2",
    // "range[begin_at]": "2024-01-01,2024-06-06",
  },
};
export const pandaScoreRouter = createTRPCRouter({
  getApiTournamentById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const { id } = input;
      // API endpoint for CS:GO tournaments
      const apiUrl = "https://api.pandascore.co/csgo/tournaments";

      let result;
      try {
        result = await axios.get(apiUrl, {
          ...defaultOptions,
          params: {
            // ...defaultOptions.params,
            "filter[serie_id]": id,
          },
        });
      } catch (error: any) {
        console.log("error", error);
      }

      return result?.data as TournamentApi[];
    }),

  getMatch: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      // API endpoint for CS:GO tournaments
      const apiUrl = "https://api.pandascore.co/csgo/matches";

      let result;
      try {
        result = await axios.get(apiUrl, {
          ...defaultOptions,
          params: {
            // ...defaultOptions.params,
            "filter[id]": id,
          },
        });
      } catch (error: any) {
        console.log("error", error);
      }

      return result?.data[0] || [];
    }),

  getAllSeries: publicProcedure.query(async ({ input, ctx }) => {
    // API endpoint for CS:GO tournaments
    // const apiUrl = "https://api.pandascore.co/csgo/series";
    const apiUrl = "https://api.pandascore.co/csgo/series/upcoming";

    let result;
    try {
      result = await axios.get(apiUrl, defaultOptions);
    } catch (error: any) {
      console.log("error", error);
    }
    console.log("result", result);
    if (!result) {
      throw Error();
    }

    return _groupBy(result.data as SerieApi[], (item) => item.league.name);
  }),

  getLeagueById: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      // API endpoint for CS:GO tournaments
      const apiUrl = "https://api.pandascore.co/csgo/leagues";

      let result;
      try {
        result = await axios.get(apiUrl, {
          ...defaultOptions,
          params: {
            // ...defaultOptions.params,
            "filter[id]": id,
          },
        });
      } catch (error: any) {
        console.log("error", error);
      }

      return result?.data || [];
    }),

  getTeamsByIds: publicProcedure
    .input(z.object({ ids: z.array(z.number()) }))
    .query(async ({ input, ctx }) => {
      const { ids } = input;
      // API endpoint for CS:GO tournaments
      const apiUrl = "https://api.pandascore.co/csgo/teams";

      let result;
      try {
        result = await axios.get(apiUrl, {
          ...defaultOptions,
          params: {
            "filter[id]": ids.join(","),
          },
        });
      } catch (error: any) {
        console.log("error", error);
      }

      return (result?.data || []) as TeamApi[];
    }),

  //
  getFeedCoef: publicProcedure.query(async ({ input, ctx }) => {
    const apiUrl = "http://45.11.24.218:3001/get-feed"; //change prod

    let result;
    try {
      result = await axios.get(apiUrl);
    } catch (error: any) {
      console.log("error", error);
    }

    return (result?.data || []) as {
      teamHome: string;
      teamAway: string;
      winHome: number;
      winAway: number;
      date: string;
    }[];
  }),
});
