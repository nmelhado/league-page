<script>
    import BracketsColumn from "./BracketsColumn.svelte";

    export let players, brackets, selection;

    const {playoffsStart, champs, losers, numRosters} = brackets;

    const champsBracket = champs.bracket;
    const champsConsolations = champs.consolations;

    const losersBracket = losers.bracket;
    const losersConsolations = losers.consolations;

    let bracket = [];
    let consolations = [];

    const changeSelection = () => {
        if(selection == 'losers') {
            bracket = losersBracket;
            consolations = losersConsolations;
            return;
        }
        bracket = champsBracket;
        consolations = champsConsolations;
    }

    $: changeSelection(selection);


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
</style>

<div class="brackets">
    <div class="bracket">
        {#each bracket as matchCol, ix}
            <BracketsColumn {matchCol} {ix} {players} {playoffsStart} playoffLength={bracket.length} losers={selection == 'losers'} />
        {/each}
    </div>

    {#each consolations as consolation, consolationNum}
        <div class="bracket">
            {#each consolation as matchCol, ix}
                <BracketsColumn {consolationNum} {matchCol} {ix} {players} {playoffsStart} playoffLength={consolation.length} {numRosters} consolation={true} losers={selection == 'losers'} />
            {/each}
        </div>
    {/each}
</div>