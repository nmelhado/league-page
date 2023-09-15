<script>
    import { gotoManager } from '$lib/utils/helper';
	import { getAvatarFromTeamManagers, getNestedTeamNamesFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';
	export let podium, leagueTeamManagers;

	const { year, champion, second, third, divisions, toilet } = podium;
</script>

<style>
	* {
		color: var(--g555);
	}

	h3 {
		margin: 2.5em 0 1.5em;
	}

	.awards {
		display: block;
		position: relative;
		width: 100%;
		z-index: 1;
	}

	#podium {
		width: 600px;
		height: 500px;
		position: relative;
		margin: 10px auto 30px;
	}

	.podiumImage {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: auto;
		z-index: 3;
	}

	.champ {
		position: absolute;
		width: 20%;
		height: auto;
		transform: translate(-50%, -50%);
		border-radius: 100%;
		border: 1px solid var(--bbb);
		background-color: var(--fff);
	}

	.laurel {
		position: absolute;
		width: 33%;
		height: auto;
		transform: translate(-50%, -50%);
		bottom: 56.6%;
		left: 50%;
		pointer-events: none;
	}

	.first {
		bottom: 70%;
		left: 50%;
	}

	.second {
		bottom: 43%;
		left: 20%;
	}

	.third {
		bottom: 39%;
		left: 80%;
	}

	h3 {
		text-align: center;
	}

	.leaderBlock {
		position: relative;
		width: 80px;
		height: 119px;
		margin: 15px auto;
	}

	.divisions {
		display: flex;
		justify-content: space-around;
	}

	.divisionLeader {
		position: absolute;
		width: 70px;
		height: 70px;
		transform: translate(-50%, 0%);
		top: 0;
		left: 50%;
		border-radius: 100%;
		border: 1px solid var(--bbb);
		background-color: var(--fff);
		z-index: 3;
	}

	.medal {
		position: absolute;
		width: 40px;
		height: auto;
		transform: translate(-50%, 0%);
		bottom: 0;
		left: 50%;
		z-index: 2;
	}

	.toiletBowl {
		position: relative;
		width: 215px;
		height: 190px;
		margin: 10px auto;
	}

	.toiletWinner {
		position: absolute;
		width: 65px;
		height: 65px;
		transform: translate(-50%, 0%);
		top: 20px;
		left: 55%;
		border-radius: 100%;
		border: 1px solid var(--bbb);
		z-index: 3;
	}

	.toilet {
		position: absolute;
		width: 100%;
		height: auto;
		transform: translate(-50%, 0%);
		bottom: 0;
		left: 50%;
	}

	.label {
		white-space: nowrap;
		line-height: 1.1em;
		text-align: center;
		min-height: 34px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: absolute;
		transform: translate(-50%, -50%);
		padding: 6px 30px;
		background-color: var(--fff);
		border: 1px solid var(--bbb);
        box-shadow: 0px 3px 3px -2px var(--boxShadowOne), 0px 3px 4px 0px var(--boxShadowTwo), 0px 1px 8px 0px var(--boxShadowThree);
	}

	.firstLabel {
		bottom: 60%;
		left: 50%;
	}

	.secondLabel {
		bottom: 40%;
		left: 20%;
	}

	.thirdLabel {
		bottom: 36%;
		left: 80%;
	}

	.genLabel {
		white-space: nowrap;
		line-height: 1.1em;
		min-height: 34px;
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		margin: 15px auto 20px;
		padding: 6px 30px;
		background-color: var(--fff);
		border: 1px solid var(--bbb);
		box-shadow: 0px 3px 3px -2px var(--boxShadowOne), 0px 3px 4px 0px var(--boxShadowTwo), 0px 1px 8px 0px var(--boxShadowThree);
	}

	.division {
		text-align: center;
	}

	.toiletParent {
		width: 100%;
		text-align: center;
		padding: 25px 0 40px;
		margin-top: 30px;
		box-shadow: 0 12px 9px -12px rgba(0,0,0,0.4);
	}

	.banner {
		display: block;
		width: 65%;
		max-width: 450px;
		margin: 20px auto 0;
	}

	.toilet-banner {
		display: block;
		width: 50%;
		max-width: 350px;
		margin: 20px auto 0;
	}

	.clickable {
		cursor: pointer;
	}

	:global(.curOwner) {
		font-size: 0.75em;
		color: var(--bbb);
		font-style: italic;
	}

	@media (max-width: 680px) {
		.label {
			padding: 6px 8px;
		}
		.genLabel {
			padding: 6px 8px;
		}
	}

	@media (max-width: 630px) {
		.label {
			font-size: 0.9em;
		}
		.genLabel {
			font-size: 0.9em;
		}
	}

	@media (max-width: 610px) {
		#podium {
			width: 500px;
			height: 417px;
			position: relative;
			margin: 10px auto 30px;
		}

		.firstLabel {
			bottom: 58%;
		}

		.secondLabel {
			bottom: 35%;
		}

		.thirdLabel {
			bottom: 31%;
		}
	}

	@media (max-width: 535px) {
		.label {
			font-size: 0.8em;
		}
		.genLabel {
			font-size: 0.8em;
		}
	}

	@media (max-width: 520px) {
		.label {
			font-size: 0.7em;
			padding: 2px 4px;
		}
		.genLabel {
			font-size: 0.7em;
			padding: 2px 4px;
		}
	}

	@media (max-width: 510px) {
		#podium {
			width: 400px;
			height: 333px;
		}
	}

	@media (max-width: 425px) {
		.label {
			font-size: 0.6em;
		}
		.genLabel {
			font-size: 0.6em;
		}
	}

	@media (max-width: 410px) {
		#podium {
			width: 300px;
			height: 250px;
		}

		.firstLabel {
			bottom: 53%;
		}

		.secondLabel {
			bottom: 31%;
		}

		.thirdLabel {
			bottom: 27%;
		}
	}

	@media (max-width: 329px) {
		.label {
			font-size: 0.5em;
		}
		.genLabel {
			font-size: 0.5em;
		}
	}
</style>

<div class="awards">
	<h3>{year} Awards</h3>

	<img src="/banner.png" class="banner" alt="The Champion's Cup" />

	<div id="podium">
		<img src="/podium.png" class="podiumImage" alt="podium" />

		<!-- champs -->
		<img src="{getAvatarFromTeamManagers(leagueTeamManagers, champion, year)}" class="first champ clickable" on:click={() => gotoManager({year, leagueTeamManagers, rosterID: champion})} alt="champion" />
		<img src="/laurel.png" class="laurel" alt="laurel" />
		<span class="label firstLabel clickable" on:click={() => gotoManager({year, leagueTeamManagers, rosterID: champion})}>{@html getNestedTeamNamesFromTeamManagers(leagueTeamManagers, year, champion)}</span>

		<img src="{getAvatarFromTeamManagers(leagueTeamManagers, second, year)}" class="second champ clickable" on:click={() => gotoManager({year, leagueTeamManagers, rosterID: second})} alt="2nd" />
		<span class="label secondLabel clickable" on:click={() => gotoManager({year, leagueTeamManagers, rosterID: second})}>{@html getNestedTeamNamesFromTeamManagers(leagueTeamManagers, year, second)}</span>

		<img src="{getAvatarFromTeamManagers(leagueTeamManagers, third, year)}" class="third champ clickable" on:click={() => gotoManager({year, leagueTeamManagers, rosterID: third})} alt="3rd" />
		<span class="label thirdLabel clickable" on:click={() => gotoManager({year, leagueTeamManagers, rosterID: third})}>{@html getNestedTeamNamesFromTeamManagers(leagueTeamManagers, year, third)}</span>
	</div>
	<div class="divisions">
		{#each divisions as division}
			{#if division.rosterID}
				<div class="division">
					{#if division.name}
						<h6>{division.name} Division</h6>
					{:else}
						<h6>Regular Season Champion</h6>
					{/if}
					<div class="leaderBlock">
						<img src="{getAvatarFromTeamManagers(leagueTeamManagers, division.rosterID, year)}" class="divisionLeader clickable" on:click={() => gotoManager({year, leagueTeamManagers, rosterID: division.rosterID})} alt="{division.name} champion" />
						<img src="/medal.png" class="medal" alt="champion" />
					</div>
					<span class="genLabel clickable" on:click={() => gotoManager({year, leagueTeamManagers, rosterID: division.rosterID})}>{@html getNestedTeamNamesFromTeamManagers(leagueTeamManagers, year, division.rosterID)}</span>
				</div>
			{/if}
		{/each}
	</div>

		<!-- Toilet Bowl -->
	{#if toilet}
		<div class="toiletParent">
			
			<img src="/toilet-banner.png" class="toilet-banner" alt="The Toilet Bowl" />

			<div class="toiletBowl">
				<img src="{getAvatarFromTeamManagers(leagueTeamManagers, toilet, year)}" class="toiletWinner clickable" on:click={() => gotoManager({year, leagueTeamManagers, rosterID: toilet})} alt="toilet bowl winner" />
				<img src="/toilet-bowl-2.png" class="toilet" alt="toilet bowl" />
			</div>
			<span class="genLabel clickable" on:click={() => gotoManager({year, leagueTeamManagers, rosterID: toilet})}>{@html getNestedTeamNamesFromTeamManagers(leagueTeamManagers, year, toilet)}</span>
		</div>
	{/if}
</div>