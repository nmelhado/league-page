<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import Button, { Group, Label } from '@smui/button';
    import BracketsColumn from "./BracketsColumn.svelte";
    import Matchup from "./Matchup.svelte";

    export let leagueTeamManagers, players, brackets, selection, queryWeek;

    const {playoffsStart, champs, losers, numRosters} = brackets;

    const champsBracket = champs.bracket;
    const champsConsolations = champs.consolations;

    const losersBracket = losers.bracket;
    const losersConsolations = losers.consolations;

    let bracket = [];
    let consolations = [];
    let allMatches = [];

    let el, top;

    onMount(() => {
        if(queryWeek && queryWeek > 0 && queryWeek < playoffsStart) {
            goto(`/matchups?week=1`, {noscroll: true});
            selection = 'regular';
        } else {
            goto(`/matchups?week=${playoffsStart}`, {noscroll: true});
        }
    })

    const changeSelection = () => {
        if(selection == 'losers') {
            bracket = losersBracket;
            consolations = losersConsolations;
        } else {
            bracket = champsBracket;
            consolations = champsConsolations;
        }
        allMatches = []
        for(const week of bracket) {
            allMatches = [...allMatches, ...week]
        }
        for(const consolation of consolations) {
            for(const week of consolation) {
                allMatches = [...allMatches, ...week]
            }
        }
        top = el?.getBoundingClientRect()?.top || 0;
        setSelected(selection);
    }

    $: changeSelection(selection);

    let selected;

    const setSelected = (s) => {
        selected = bracket[0]?.filter(mp => !mp.bye)[0][0].m || null;
    }

    let matchup, displayWeek;
    const changeDisplay = (s) => {
        top = el?.getBoundingClientRect()?.top || 0;
        matchup = allMatches.filter(match => match[0].m == s)[0];
        displayWeek = playoffsStart + matchup[0].r - 1;
        window.scrollTo({left: 0, top, behavior: 'smooth'});
    }

    let matchupWeek = 1;

    const changeMatchupGame = (week) => {
        matchupWeek = week;
    }

    $: changeDisplay(selected);
</script>

<style>
    .brackets {
        margin: 2em 0 6em;
    }

    .bracket {
        margin: 1em 0;
        display: flex;
        justify-content: center;
    }

    .matchupEnclosure {
        padding: 2em 0;
        margin-bottom: 2em;
    }

    .buttonHolder {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 3em 0;
    }
</style>

<div class="brackets">
    <div class="bracket">
        {#each bracket as matchCol, ix}
            <BracketsColumn bind:selected={selected} {leagueTeamManagers} {matchCol} {ix} {players} {playoffsStart} playoffLength={bracket.length} losers={selection == 'losers'} />
        {/each}
    </div>

    {#each consolations as consolation, consolationNum}
        <div class="bracket">
            {#each consolation as matchCol, ix}
                <BracketsColumn bind:selected={selected} {leagueTeamManagers} {consolationNum} {matchCol} {ix} {players} {playoffsStart} playoffLength={consolation.length} {numRosters} consolation={true} losers={selection == 'losers'} />
            {/each}
        </div>
    {/each}
</div>

<div class="matchupEnclosure" bind:this={el}>
    {#if matchup}
        {#if matchup[0].starters[2] }
            <div class="buttonHolder">
                <Group variant="outlined">
                    <!-- Regular Season -->
                    <Button class="selectionButtons" on:click={() => changeMatchupGame(1)} variant="{matchupWeek == 1 ? "raised" : "outlined"}">
                        <Label>First Week</Label>
                    </Button>
                    <!-- Championship Bracket -->
                    <Button class="selectionButtons" on:click={() => changeMatchupGame(2)} variant="{matchupWeek == 2 ? "raised" : "outlined"}">
                        <Label>Second Week</Label>
                    </Button>
                </Group>
            </div>
        {/if}
        <Matchup ix={selected} active={selected} {matchup} {matchupWeek} {players} {displayWeek} expandOverride={true} {leagueTeamManagers} />
    {/if}
</div>