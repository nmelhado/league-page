<script context="module">
	import { getLeagueStandings, getLeagueUsers } from '$lib/utils/helper';

    export async function load() {

		const standingsData = getLeagueStandings();
		const usersData = getLeagueUsers();
	
		return {
			props: {
				standingsData,
				usersData,
			}
		};
	}
</script>

<script>
	import { Standings } from '$lib/components'

	export let standingsData, usersData;
</script>

<style>
	.holder {
		position: relative;
		z-index: 1;
		text-align: center;
	}
</style>

<div class="holder">
	<Standings {standingsData} {usersData} />
</div>
