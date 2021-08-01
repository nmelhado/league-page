<script>
	import LinearProgress from '@smui/linear-progress';
	import { getNflState, cleanName } from '$lib/utils/helper';
	import { Transactions, PowerRankings} from '$lib/components';
    import { getAwards } from "$lib/utils/helper"
    import { rosterManagers } from '$lib/utils/rosterManagers';
    import { goto } from '$app/navigation';

    let nflState = getNflState();
    let podiumsData = getAwards();


	$: left = el?.getBoundingClientRect() ? el?.getBoundingClientRect().left  : 0;

    let el;
    
    	const getNames = (name, rosterID, currentManagers) => {
		if(cleanName(name) != cleanName(currentManagers[rosterID].name)) {
			return `${name}<div class="curOwner">(${currentManagers[rosterID].name})</div>`;
		}
		return name;
	}

</script>

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
        background-color: #ebebeb;
        border-left: #eee;
		box-shadow: inset 0px 3px 3px -2px rgb(0 0 0 / 20%), inset 0px 3px 4px 0px rgb(0 0 0 / 14%), inset 0px 1px 8px 0px rgb(0 0 0 / 12%);
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
        box-shadow: 0 0 8px 0 #777;
        background-color: #f3f3f3;
        box-shadow: 0 -8px 8px -8px #555, 0 8px 8px -8px #555;
        border-left: 1px solid #ccc;
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
        background-color: #fff;
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
            <h6>The Legends League</h6>
            <p>Founded in 2014, the Legends League began as keeper league amongst a small group of friends. In 2019, the league converted into a full-fledged dynasty league. Each year, the managers compete to win the Legends Cup and avoid the <i>ever-humiliating</i> Tammy Bowl.</p>
            <p>Some managers built immediate win-now teams, while others began the slow process of building a juggernaut dynasty team. A portion of the league prioritized youth and draft picks, the rest gravitated towards the steadfast value of veterans. While some managers fled from injuries and down years, others bought the dip and built for the future.</p>
            <p>In astounding commitment to building a dynasty franchise, many of the managers have begun to have kids and groom the next generation of managers to take over their teams. The mini managers are being heavily indoctrinated into the fantasy lifestyle and will be expected to take an active role as soon as they can succesfully type out a coherent trade offer.</p>
            <p>In contrast to the addition of the mini managers, some managers have also left but, despite that, the league has only gotten stronger. With more passionate managers, the competition has become more intense and more difficult each year.</p>
            <p>While the ultimate prize is bragging rights and sending obnoxious texts to the rest of the league for the next year, the champion manager also walks away with $800 and the last place manager ships the Legends Cup to the new champion.</p>
        </div>
        <PowerRankings />
    </div>
    
    <div class="leagueData">
        <div class="homeBanner">
            {#await nflState}
                <p class="center">Retreiving NFL state...</p>
                <LinearProgress indeterminate />
            {:then nflStateData}
                <p class="center">NFL {nflStateData.season} {nflStateData.week > 0 ? `Week ${nflStateData.week}` : "Preseason"}</p>
            {:catch error}
                <p class="center">Something went wrong: {error.message}</p>
            {/await}
        </div>

        <div id="currentChamp">
            {#await podiumsData}
                <p class="center">Retreiving awards...</p>
                <LinearProgress indeterminate />
            {:then {podiums, currentManagers}}
                <h4>{podiums[0].year} Champ</h4>
                <div id="champ" on:click={() => goto(`/managers?manager=${rosterManagers[parseInt(podiums[0].champion.rosterID)]}`)} >
                    <img src="{podiums[0].champion.avatar}" class="first" alt="champion" />
                    <img src="./laurel.png" class="laurel" alt="laurel" />
                </div>
                <span class="label" on:click={() => goto(`/managers?manager=${rosterManagers[parseInt(podiums[0].champion.rosterID)]}`)} >{@html getNames(podiums[0].champion.name, podiums[0].champion.rosterID, currentManagers)}</span>
            {:catch error}
                <p class="center">Something went wrong: {error.message}</p>
            {/await}
        </div>

        <div class="transactions" bind:this={el} >
            <Transactions masterOffset={left} />
        </div>
    </div>
</div>