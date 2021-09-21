<script context="module">
	import { getAwards } from '$lib/utils/helper';

    export async function load() {
        const awardsData = getAwards();
	
		return {
			props: {
				awardsData,
			}
		};
	}
</script>

<script>
	import { Awards } from '$lib/components'
	import LinearProgress from '@smui/linear-progress';

    export let awardsData;
</script>

<style>
    .awards {
        display: block;
        margin: 30px auto;
		width: 95%;
		max-width: 1000px;
		position: relative;
		z-index: 1;
		overflow-y: hidden;
    }

	.loading {
		display: block;
		width: 85%;
		max-width: 500px;
		margin: 80px auto;
	}

	.nothingYet {
		display: block;
		width: 85%;
		max-width: 500px;
		margin: 80px auto;
		text-align: center;
	}
</style>

<div class="awards">
	{#await awardsData }
		<div class="loading">
			<p>Retrieving awards data...</p>
			<LinearProgress indeterminate />
		</div>
	{:then {podiums, currentManagers} }
		{#each podiums as podium}
			<Awards {podium} {currentManagers} />
		{:else}
			<p class="nothingYet">No seasons have been completed yet, so no awards have been earned...</p>
		{/each}
	{:catch error}
		<!-- promise was rejected -->
		<p>Something went wrong: {error.message}</p>
	{/await}
</div>