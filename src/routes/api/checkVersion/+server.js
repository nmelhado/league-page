import { version } from "$lib/version";
import { json } from "@sveltejs/kit";
import {
  handleApiError,
  handleFetchError,
  safeJsonParse,
} from "$lib/utils/errorHandler";

export async function GET() {
  try {
    const res = await handleFetchError(
      "https://league-page.nmelhado.com/api/checkGlobalVersion",
      new Error("Version check failed"),
    );
    let needsUpdate = false;

    if (res && !res.error && res.ok) {
      const globalVersion = await safeJsonParse(res, "version check");
      if (!globalVersion.error) {
        // If it reaches the global checkpoint and the versions do not match
        // set needsUpdate to true to display the update prompt
        needsUpdate = globalVersion != version;
      }
    }

    return json(needsUpdate);
  } catch (error) {
    return json(handleApiError(error, "version check", false));
  }
}
