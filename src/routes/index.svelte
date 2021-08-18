<script>
	import LinearProgress from '@smui/linear-progress';
	import { getNflState, cleanName, leagueName, homepageText, managers, gotoManager } from '$lib/utils/helper';
	import { Transactions, PowerRankings} from '$lib/components';
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
        display: flex;
        flex-wrap: nowrap;
        position: relative;
        overflow-y: hidden;
        z-index: 1;
    }

    #main {
        flex-grow: 1;
        min-width: 320px;
        margin: 0 auto;
        padding: 60px 0;
    }

    .text {
        padding: 0 30px;
        max-width: 620px;
        margin: 0 auto;
    }

    .leagueData {
        position: relative;
        z-index: 1;
        width: 100%;
        min-width: 470px;
        max-width: 470px;
        min-height: 100%;
		background-color: var(--ebebeb);
        border-left: var(--eee);
		box-shadow: inset 0px 3px 3px -2px rgb(0 0 0 / 40%), inset 0px 3px 4px 0px rgb(0 0 0 / 28%), inset 0px 1px 8px 0px rgb(0 0 0 / 24%);
    }

    @media (max-width: 950px) {
        .leagueData {
            max-width: 100%;
            min-width: 100%;
            width: 100%;
        }
        #home {
            flex-wrap: wrap;
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

    /* champ styling */
    #currentChamp {
        padding: 25px 0;
		background-color: var(--f3f3f3);
        box-shadow: 5px 0 8px var(--champShadow);
        border-left: 1px solid var(--ddd);
    }

    #champ {
        position: relative;
        width: 150px;
        height: 150px;
        margin: 0 auto;
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
        font-size: 1.6em;
        margin: 10px;
    }

    .label {
        display: table;
        text-align: center;
        line-height: 1.1em;
        padding: 6px 20px;
        background-color: var(--fff);
        border: 1px solid #aaa;
        margin: 10px auto 0;
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
        <div class="text">
            <h6>{leagueName}</h6>
            <!-- homepageText contains the intro text for your league, this gets edited in /src/lib/utils/leagueInfo.js -->
            {@html homepageText }
        </div>
	<div id="odds">
	    <iframe id="frame" style="width: 100%;border:0px solid black;height: 800px;" src="https://www.theffhub.com/Home/PlayoffOdds?site=Sleeper&leagueId=716328508556668928&userId=&s2=&swid=" frameborder="0"></iframe>
	</div>
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
