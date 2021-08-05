
<script>
	import LinearProgress from '@smui/linear-progress';
	import MatchupWeeks from './MatchupWeeks.svelte';
	import Brackets from './Brackets.svelte';
    import Button, { Group, Label } from '@smui/button';

	export let queryWeek, matchupsData, bracketsData, playersData;

    let selection = 'champions';
</script>

<style>
    .message {
        display: block;
        width: 85%;
        max-width: 500px;
        margin: 80px auto;
    }

    .buttonHolder {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 3em 0;
    }
</style>



{#await playersData}
    <!-- promise is pending -->
    <div class="message">
        <p>Loading league matchups...</p>
        <LinearProgress indeterminate />
    </div>
{:then players}
    <!-- Display Regular SeasonMatchups -->
    {#await matchupsData}
        <!-- promise is pending -->
        <div class="message">
            <p>Loading league matchups...</p>
            <LinearProgress indeterminate />
        </div>
    {:then {matchupWeeks, year, week, regularSeasonLength}}
        {#if matchupWeeks.length}
            <div class="buttonHolder">
                <Group variant="outlined">
                    <!-- Regular Season -->
                    <Button class="selectionButtons" on:click={() => selection = 'regular'} variant="{selection == 'regular' ? "raised" : "outlined"}">
                        <Label>Regular Season</Label>
                    </Button>
                    <!-- Championship Bracket -->
                    <Button class="selectionButtons" on:click={() => selection = 'champions'} variant="{selection == 'champions' || selection == 'losers' ? "raised" : "outlined"}">
                        <Label>Playoffs</Label>
                    </Button>
                </Group>
                {#if selection == 'champions' || selection == 'losers'}
                    <Group variant="outlined">
                        <!-- Championship Bracket -->
                        <Button class="selectionButtons" on:click={() => selection = 'champions'} variant="{selection == 'champions' ? "raised" : "outlined"}">
                            <Label>Champions' Bracket</Label>
                        </Button>
                        <!-- Losers Bracket -->
                        <Button class="selectionButtons" on:click={() => selection = 'losers'} variant="{selection == 'losers' ? "raised" : "outlined"}">
                            <Label>Losers' Bracket</Label>
                        </Button>
                    </Group>
                {/if}
            </div>
            {#if selection == 'regular'}
                <MatchupWeeks {players} {queryWeek} {matchupWeeks} {regularSeasonLength} {year} {week} />
            {/if}
        {:else}
            <div class="message">
                <p>No upcoming matchups...</p>
            </div>
        {/if}
    {:catch error}
        <!-- promise was rejected -->
        <p>Something went wrong: {error.message}</p>
    {/await}

    <!-- Display Playoff Brackets -->
    {#await bracketsData}
        <!-- promise is pending -->
        <div class="message">
            <p>Loading league matchups...</p>
            <LinearProgress indeterminate />
        </div>
    {:then brackets}
        <!-- {promise has processed -->
        {#if brackets.champs.bracket[0][0][0].points && (selection == 'champions' || selection == 'losers')}
            <Brackets {players} {brackets} {selection}/>
        {/if}
    {:catch error}
        <!-- promise was rejected -->
        <p>Something went wrong: {error.message}</p>
    {/await}
{:catch error}
    <!-- promise was rejected -->
    <p>Something went wrong: {error.message}</p>
{/await}