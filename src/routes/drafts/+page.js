import { getUpcomingDraft, getPreviousDrafts } from '$lib/utils/helper';

export async function load() {
    const upcomingDraftData = getUpcomingDraft();
    const previousDraftsData = getPreviousDrafts();

    return {
        upcomingDraftData,
        previousDraftsData
    };
}