<script>
	import LinearProgress from '@smui/linear-progress';
	import { getNflState, cleanName, leagueName, homepageText, managers, gotoManager, enableBlog } from '$lib/utils/helper';
	import { Transactions, PowerRankings, HomePost} from '$lib/components';
    import { getAwards } from "$lib/utils/helper"

    let nflState = getNflState();
    let podiumsData = getAwards();

    const getNames = (name, rosterID, currentManagers) => {
		if(cleanName(name) != cleanName(currentManagers[rosterID].name)) {
			return `${name}<div class="curOwner">(${currentManagers[rosterID].name})</div>`;
		}
		return name;
	}

    let el, left;

    const resize = (w) => {
        left = el?.getBoundingClientRect() ? el?.getBoundingClientRect().left  : 0;
    }

    $: resize(innerWidth);

    let innerWidth;

</script>

<svelte:window bind:innerWidth={innerWidth} />

<style>
    #home {
        display: grid;
        grid-template-columns: 1fr 360px;
        gap: 2rem;
        position: relative;
        overflow-y: hidden;
        z-index: 1;
        padding: 2rem 1rem;
    }

    #main {
        flex-grow: 1;
        min-width: 320px;
        margin: 0 auto;
        padding: 2rem 0;
    }

    .text {
        padding: 0 1rem;
        max-width: 700px;
        margin: 0 auto;
        text-align: center;
    }

    .leagueData {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 360px;
        min-height: 100%;
        padding: 1.5rem 1rem;
        background: var(--fff);
        border: 1px solid var(--eee);
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    @media (max-width: 950px) {
        #home {
            grid-template-columns: 1fr;
        }
        .leagueData {
            max-width: 100%;
        }
    }

    .transactions {
        display: block;
        width: 95%;
        margin: 10px auto;
    }

    .center {
        text-align: center;
    }

    h6 {
        text-align: center;
    }

    .leagueName {
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }

    /* champ styling */
    #currentChamp {
        padding: 1.5rem 0;
        background-color: var(--f3f3f3);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        border-left: 4px solid var(--ddd);
        border-radius: 6px;
        margin-bottom: 1.5rem;
    }

    #champ {
        position: relative;
        width: 150px;
        height: 150px;
        margin: 0 auto 0.5rem;
        cursor: pointer;
    }

    .first {
        position: absolute;
        transform: translate(-50%, -50%);
        width: 80px;
        height: 80px;
        border-radius: 100%;
        border: 1px solid #ccc;
        left: 50%;
        top: 43%;
    }

    .laurel {
        position: absolute;
        transform: translate(-50%, -50%);
        width: 135px;
        height: auto;
        left: 50%;
        top: 50%;
    }

    h4 {
        text-align: center;
        font-size: 1.3em;
        margin: 0 0 0.5rem;
    }

    .label {
        display: inline-block;
        text-align: center;
        line-height: 1.1em;
        padding: 6px 16px;
        background-color: var(--fff);
        border: 1px solid var(--aaa);
        border-radius: 4px;
        margin: 0 auto;
        cursor: pointer;
    }
    
	:global(.curOwner) {
		font-size: 0.75em;
		color: #bbb;
		font-style: italic;
	}
</style>

<div id="home">
    <div id="main">
        <section id="intro" class="text">
            <h1 class="leagueName">{leagueName}</h1>
            <!-- homepageText contains the intro text for your league, this gets edited in /src/lib/utils/leagueInfo.js -->
            {@html homepageText }
            <!-- Most recent Blog Post (if enabled) -->
            {#if enableBlog}
                <HomePost />
            {/if}
        </section>
        <PowerRankings />
    </div>
    
    <div class="leagueData">
        <div class="homeBanner">
            {#await nflState}
                <p class="center">Retrieving NFL state...</p>
                <LinearProgress indeterminate />
            {:then nflStateData}
                <p class="center">NFL {nflStateData.season} 
                    {#if nflStateData.season_type == 'pre'}
                        Preseason
                    {:else if nflStateData.season_type == 'post'}
                        Postseason
                    {:else}
                        {nflStateData.week > 0 ? `Week ${nflStateData.week}` : "Preseason"}
                    {/if}
                </p>
            {:catch error}
                <p class="center">Something went wrong: {error.message}</p>
            {/await}
        </div>

        <div id="currentChamp">
            {#await podiumsData}
                <p class="center">Retrieving awards...</p>
                <LinearProgress indeterminate />
            {:then {podiums, currentManagers}}
                {#if podiums[0]}
                    <h4>{podiums[0].year} Champ</h4>
                    <div id="champ" on:click={() => {if(managers.length) gotoManager(parseInt(podiums[0].champion.rosterID))}} >
                        <img src="{podiums[0].champion.avatar}" class="first" alt="champion" />
                        <img src="./laurel.png" class="laurel" alt="laurel" />
                    </div>
                    <span class="label" on:click={() => gotoManager(parseInt(podiums[0].champion.rosterID))} >{@html getNames(podiums[0].champion.name, podiums[0].champion.rosterID, currentManagers)}</span>
                {:else}
                    <p class="center">No former champs.</p>
                {/if}
            {:catch error}
                <p class="center">Something went wrong: {error.message}</p>
            {/await}
        </div>

        <div class="transactions" bind:this={el} >
            <Transactions masterOffset={left} />
        </div>
    </div>
</div>