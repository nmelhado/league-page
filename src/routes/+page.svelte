<script>
	import LinearProgress from '@smui/linear-progress';
	import { getNflState, leagueName, getAwards, getLeagueTeamManagers, homepageText, managers, gotoManager, enableBlog, waitForAll, goto } from '$lib/utils/helper';
	import { Transactions, PowerRankings, HomePost} from '$lib/components';
	import { getAvatarFromTeamManagers, getTeamFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';
	import Button, { Icon, Label } from '@smui/button';

    const nflState = getNflState();
    const podiumsData = getAwards();
    const leagueTeamManagersData = getLeagueTeamManagers();

	let powerRankingsVisible = true;
	let transactionsVisible = true;
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
		background-color: var(--ebebeb);
        border-left: var(--eee);
		box-shadow: inset 8px 0px 6px -6px rgb(0 0 0 / 24%);
    }

    @media (max-width: 950px) {
        .leagueData {
            max-width: 100%;
            min-width: 100%;
            width: 100%;
		    box-shadow: none;
        }
        #home {
            flex-wrap: wrap;
        }
    }

    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px; /* Padding for the header area */
		margin-top: 20px; /* Space above section headers */
    }

	.section-header h5 {
		margin: 0;
		font-size: 1.4em;
	}

    .transactions-container, .power-rankings-container { /* Added containers */
        display: block;
        width: 95%;
        margin: 10px auto;
		padding-bottom: 10px; /* Space for "View All" button if section is visible */
    }

    .center {
        text-align: center;
    }

    h6 {
        text-align: center;
    }

    .homeBanner {
        background-color: var(--blueOne);
        color: #fff;
        padding: 0.5em 0;
        font-weight: 500;
        font-size: 1.5em;
    }

    /* champ styling */
    #currentChamp {
        padding: 20px; /* Adjusted padding */
		background-color: var(--surface, #ffffff); /* Use surface color from theme */
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* More uniform shadow */
        border-radius: 8px; /* Rounded corners for card-like feel */
        margin: 20px; /* Add margin to separate from other elements */
        text-align: center; /* Center align content */
    }

    #champ {
        position: relative;
        width: 150px; /* Can be adjusted if needed */
        height: 150px;
        margin: 15px auto; /* Adjusted margin */
        cursor: pointer;
        transition: transform 0.2s ease-in-out; /* For hover effect */
    }

    #champ:hover {
        transform: scale(1.05); /* Slight scale effect on hover */
    }

    .first { /* Avatar */
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

    .bimfle {
        position: absolute;
        transform: translate(-50%, -50%);
        width: 576px;
        height: auto;
        left: 50%;
        top: 50%;
    }

    #currentChamp h4 { /* Champ year title */
        text-align: center;
        font-size: 1.5em; /* Slightly reduced for balance */
        margin-bottom: 15px; /* Increased margin bottom */
        font-weight: 600; /* Bolder */
        font-style: normal; /* Removed italic unless preferred */
        color: var(--on-surface, #212529);
    }

    .label { /* Champ name */
        display: block; /* Changed to block for easier centering & margin handling */
        text-align: center;
        line-height: 1.2em; /* Adjusted line height */
        font-size: 1.6em; /* Slightly reduced for balance */
        margin: 10px auto;
        cursor: pointer;
        font-weight: 500; /* Medium weight */
        color: var(--mdc-theme-primary, #007bff); /* Use primary color */
        transition: text-decoration 0.2s ease-in-out;
    }

    .label:hover {
        text-decoration: underline; /* Underline on hover */
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
		<img src="/bimfle_large.png" class="bimfle" alt="bimfle" />
            <!-- Most recent Blog Post (if enabled) -->
            {#if enableBlog}
                <HomePost />
            {/if}
        </div>
		<div class="section-header">
			<h5>Power Rankings</h5>
			<div>
				<Button on:click={() => powerRankingsVisible = !powerRankingsVisible} style="margin-right: 8px;">
					<Icon class="material-icons">{powerRankingsVisible ? 'visibility_off' : 'visibility'}</Icon>
					<Label>{powerRankingsVisible ? 'Hide' : 'Show'}</Label>
				</Button>
				<Button variant="outlined" on:click={() => goto('/power-rankings')}>
					<Label>View All</Label>
				</Button>
			</div>
		</div>
		{#if powerRankingsVisible}
		<PowerRankings />
		{/if}
    </div>
    
    <div class="leagueData">
        <div class="homeBanner">
            {#await nflState}
                <div class="center">Retrieving NFL state...</div>
                <LinearProgress indeterminate />
            {:then nflStateData}
                <div class="center">NFL {nflStateData.season} 
                    {#if nflStateData.season_type == 'pre'}
                        Preseason
                    {:else if nflStateData.season_type == 'post'}
                        Postseason
                    {:else}
                        Season - {nflStateData.week > 0 ? `Week ${nflStateData.week}` : "Preseason"}
                    {/if}
                </div>
            {:catch error}
                <div class="center">Something went wrong: {error.message}</div>
            {/await}
        </div>

        <div id="currentChamp">
            {#await waitForAll(podiumsData, leagueTeamManagersData)}
                <p class="center">Retrieving awards...</p>
                <LinearProgress indeterminate />
            {:then [podiums, leagueTeamManagers]}
                {#if podiums[0]}
                    <h4>{podiums[0].year} Fantasy Champ</h4>
                    <div id="champ" on:click={() => {if(managers.length) gotoManager({year: podiums[0].year, leagueTeamManagers, rosterID: parseInt(podiums[0].champion)})}} >
                        <img src="{getAvatarFromTeamManagers(leagueTeamManagers, podiums[0].champion, podiums[0].year)}" class="first" alt="champion" />
                        <img src="/laurel.png" class="laurel" alt="laurel" />
                    </div>
                    <span class="label" on:click={() => gotoManager({year: podiums[0].year, leagueTeamManagers, rosterID: parseInt(podiums[0].champion)})} >{getTeamFromTeamManagers(leagueTeamManagers, podiums[0].champion, podiums[0].year).name}</span>
                {:else}
                    <p class="center">No former champs.</p>
                {/if}
            {:catch error}
                <p class="center">Something went wrong: {error.message}</p>
            {/await}
        </div>

        <div id="currentChamp">
            {#await waitForAll(podiumsData, leagueTeamManagersData)}
                <p class="center">Retrieving awards...</p>
                <LinearProgress indeterminate />
            {:then [podiums, leagueTeamManagers]}
                {#if podiums[0]}
                    <h4>{podiums[0].year} Fantasy Champ</h4>
                    <div id="champ" on:click={() => {if(managers.length) gotoManager({year: podiums[0].year, leagueTeamManagers, rosterID: parseInt(podiums[0].champion)})}} >
                        <img src="{getAvatarFromTeamManagers(leagueTeamManagers, podiums[0].champion, podiums[0].year)}" class="first" alt="champion" />
                        <img src="/laurel.png" class="laurel" alt="laurel" />
                    </div>
                    <span class="label" on:click={() => gotoManager({year: podiums[0].year, leagueTeamManagers, rosterID: parseInt(podiums[0].champion)})} >{getTeamFromTeamManagers(leagueTeamManagers, podiums[0].champion, podiums[0].year).name}</span>
                {:else}
                    <p class="center">No former champs.</p>
                {/if}
            {:catch error}
                <p class="center">Something went wrong: {error.message}</p>
            {/await}
        </div>

		<div class="section-header">
			<h5>Recent Transactions</h5>
			<div>
				<Button on:click={() => transactionsVisible = !transactionsVisible} style="margin-right: 8px;">
					<Icon class="material-icons">{transactionsVisible ? 'visibility_off' : 'visibility'}</Icon>
					<Label>{transactionsVisible ? 'Hide' : 'Show'}</Label>
				</Button>
				<Button variant="outlined" on:click={() => goto('/transactions')}>
					<Label>View All</Label>
				</Button>
			</div>
		</div>
        <div class="transactions-container" >
            {#if transactionsVisible}
                <Transactions />
            {/if}
        </div>
    </div>
</div>
