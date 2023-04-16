<script>
	import Matchup from "$lib/Matchups/Matchup.svelte";
	import ComparissonBar from "./ComparissonBar.svelte";

	export let leagueTeamManagers, playersInfo, rivalryInfo;

    let selected = 0;

    $: matchup = rivalryInfo.matchups[selected].matchup;
    $: displayWeek = rivalryInfo.matchups[selected].week;
    $: year = rivalryInfo.matchups[selected].year;
</script>

<style>
    h3 {
        text-align: center;
        font-size: 2.2em;
        margin: 20px 0 16px;
    }
    h4 {
        text-align: center;
        font-size: 1.8em;
        margin: 10px;
    }
</style>

<h3>Head to Head</h3>

<div class="scoreBoard">
    {#if rivalryInfo.wins.one > 0 || rivalryInfo.wins.two > 0 }
        <h4>Wins</h4>
        <ComparissonBar sideOne={rivalryInfo.wins.one} sideTwo={rivalryInfo.wins.two} />
    {/if}
    {#if rivalryInfo.ties > 0}
        <h4>Ties</h4>
    {/if}
    {#if rivalryInfo.wins.one > 0 || rivalryInfo.wins.two > 0 }
        <h4>Points</h4>
        <ComparissonBar sideOne={rivalryInfo.points.one} sideTwo={rivalryInfo.points.two} />
    {/if}
</div>

<h3>Matchups</h3>

<h4>{year} Week {displayWeek}</h4>

<Matchup ix={selected} active={selected} {matchup} players={playersInfo.players} {displayWeek} expandOverride={true} {leagueTeamManagers} />

