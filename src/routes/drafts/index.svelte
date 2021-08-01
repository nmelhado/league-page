<script context="module">
	import { getUpcomingDraft, getPreviousDrafts } from '$lib/utils/helper';

    export async function load() {
        const upcomingDraftData = getUpcomingDraft();
        const previousDraftsData = getPreviousDrafts();
	
		return {
			props: {
				upcomingDraftData,
                previousDraftsData
			}
		};
	}
</script>

<script>
	import { Drafts } from '$lib/components';

    export let upcomingDraftData, previousDraftsData;
</script>

<style>
    #main {
        position: relative;
        z-index: 1;
    }
</style>

<div id="main">
	<Drafts {upcomingDraftData} {previousDraftsData} />
</div>