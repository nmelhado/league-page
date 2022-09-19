import { getAwards } from '$lib/utils/helper';

export async function load() {
    const awardsData = getAwards();

    return {
        awardsData,
    };
}