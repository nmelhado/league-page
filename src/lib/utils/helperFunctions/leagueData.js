import { get } from "svelte/store";
import { leagueData } from "$lib/stores";
import { leagueID } from "$lib/utils/leagueInfo";
import {
  handleApiError,
  handleFetchError,
  safeJsonParse,
} from "$lib/utils/errorHandler";

export const getLeagueData = async (queryLeagueID = leagueID) => {
  if (get(leagueData)[queryLeagueID]) {
    return get(leagueData)[queryLeagueID];
  }

  try {
    const res = await handleFetchError(
      `https://api.sleeper.app/v1/league/${queryLeagueID}`,
      new Error("League data fetch failed"),
    );
    if (res.error) {
      throw new Error("Failed to fetch league data");
    }

    const data = await safeJsonParse(res, `league data for ${queryLeagueID}`);
    if (data.error) {
      throw new Error("Failed to parse league data");
    }

    if (res.ok) {
      leagueData.update((ld) => {
        ld[queryLeagueID] = data;
        return ld;
      });
      return data;
    } else {
      throw new Error(data.message || "League data fetch failed");
    }
  } catch (error) {
    return handleApiError(error, `getLeagueData for ${queryLeagueID}`, null);
  }
};
