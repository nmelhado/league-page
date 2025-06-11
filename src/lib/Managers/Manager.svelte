<script>
    import Button, { Group, Label } from '@smui/button';
	import LinearProgress from '@smui/linear-progress';
    import {loadPlayers, getLeagueTransactions} from '$lib/utils/helper';
    import { Icon } from '@smui/icon-button'; // Import SMUI Icon
	import Roster from '../Rosters/Roster.svelte';
	import TransactionsPage from '../Transactions/TransactionsPage.svelte';
    import { goto } from '$app/navigation';
    import ManagerFantasyInfo from './ManagerFantasyInfo.svelte';
    import ManagerAwards from './ManagerAwards.svelte';
    import { onMount } from 'svelte';
	import { getDatesActive, getRosterIDFromManagerID, getTeamNameFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';

    export let manager, managers, rostersData, leagueTeamManagers, rosterPositions, transactionsData, awards, records;

    let transactions = transactionsData.transactions;

    $: viewManager = managers[manager];

    $: datesActive = getDatesActive(leagueTeamManagers, viewManager.managerID);

    const  startersAndReserve = rostersData.startersAndReserve;
    let rosters = rostersData.rosters;

    $: ({rosterID, year} = viewManager.managerID ? getRosterIDFromManagerID(leagueTeamManagers, viewManager.managerID) : {rosterID: viewManager.roster, year: null});

    $: teamTransactions = transactions.filter(t => t.rosters.includes(parseInt(rosterID)));

    $: roster = rosters[rosterID];

    $: coOwners = year && rosterID ? leagueTeamManagers.teamManagersMap[year][rosterID].managers.length > 1 : roster.co_owners;

    $: commissioner = viewManager.managerID ? leagueTeamManagers.users[viewManager.managerID].is_owner : false;

    let players, playersInfo;
    let loading = true;

    const refreshTransactions = async () => {
        const newTransactions = await getLeagueTransactions(false, true);
        transactions = newTransactions.transactions;
    }

    onMount(async () => {
        if(transactionsData.stale) {
            refreshTransactions();
        }
        const playerData = await loadPlayers(null);
        playersInfo = playerData;
        players = playerData.players;
        loading = false;

        if(playerData.stale) {
            const newPlayerData = await loadPlayers(null, true);
            playersInfo = newPlayerData;
            players = newPlayerData.players;
        }
    })

    const changeManager = (newManager, noscroll = false) => {
        if(!newManager) {
            goto(`/managers`);
        }
        manager = newManager;
        goto(`/manager?manager=${newManager}`, {noscroll});
    }
</script>

<style>
    .managerContainer {
        width: 100%;
        margin: 1em 0 3em; /* Adjusted margin */
    }

    .manager-section-card {
        background-color: var(--surface, #ffffff);
        border-radius: 8px;
        padding: 1.5em; /* Default padding for cards */
        margin-bottom: 2em;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.05); /* Subtle shadow */
    }

    .section-title-header { /* For section titles like "Current Roster H3 + Button" */
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1em; /* Space below title/button before content */
    }

    .section-title-header h3 {
        margin: 0; /* Remove default h3 margin as flex handles spacing */
        font-size: 1.3em; /* Consistent with other h3s like Awards */
        font-weight: 600;
    }

    .manager-header-card { /* For the top section with photo and basic info */
        background-color: var(--surface, #ffffff);
        border-radius: 8px;
        padding: 1.5em;
        margin-bottom: 2em; /* Space before the nav buttons */
        box-shadow: 0 2px 4px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.05);
        text-align: center; /* Center photo and name block */
    }

    .managerConstrained { /* This will now apply to content within cards if needed, or be replaced by card styling */
        width: 97%;
        max-width: 800px; /* Max width for the overall page content */
        margin: 0 auto;
    }

    .managerPhoto {
        display: block;
        border-radius: 100%;
        width: 70%;
        max-width: 200px;
        height: auto;
        margin: 5em auto 1em;
        box-shadow: 0 0 8px 4px #aaa;
    }

    h2 {
        text-align: center;
        font-size: 2.8em;
        margin: 1em 0 0em;
        line-height: 1em;
    }

    h3 {
        text-align: center;
        font-size: 1.5em;
        margin: 1.5em 0 0.5em;
        font-weight: 200;
    }

    .basicInfo {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        height: 24px;
        margin: 2em 0;
    }

    .basicInfo span {
        color: var(--on-surface-variant, #555); /* Use a theme color for less emphasis */
        font-size: 0.9em;
        display: inline-flex; /* For icon alignment */
        align-items: center;
        gap: 0.4em; /* Space between icon and text */
    }

    .infoChild {
        font-style: normal; /* Removed italic for cleaner look with icons */
    }

    .infoChild .material-icons { /* Icon styling */
        font-size: 1.1em; /* Adjust icon size */
        color: var(--g555); /* Icon color */
    }

    .infoContact { /* For platform image like discord/twitter */
        height: 18px; /* Adjusted size */
        vertical-align: middle;
        /* padding-left: 1em; */ /* Replaced by gap */
    }

    .infoTeam { /* For NFL team logo */
        height: 22px; /* Adjusted size */
        vertical-align: middle;
    }

    .bio {
        margin: 2em 1.5em 2em;
        text-indent: 4em;
    }

    .philosophy {
        margin: 2em 1.5em 2em;
        text-indent: 4em;
    }

    .loading {
        display: block;
        width: 85%;
        max-width: 500px;
        margin: 80px auto;
    }

    .teamSub {
        font-size: 0.4em;
        line-height: 1em;
        color: #666;
    }

    .managerNav {
        margin: 4em 0 2em;
        text-align: center;
    }

    .upper {
        margin-top: 0;
    }

    .commissionerBadge {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 25px;
        width: 25px;
        font-weight: 600;
        border-radius: 15px;
        background-color: var(--blueTwo);
        border: 1px solid var(--blueOne);
    }

    .commissionerBadge span {
        font-style: normal;
        color: #fff;
    }

    /* media queries */

    @media (max-width: 505px) {
        :global(.selectionButtons span) {
            font-size: 0.8em;
        }
    }

    @media (max-width: 435px) {
        :global(.selectionButtons span) {
            line-height: 1.2em;
            font-size: 0.8em;
        }
    }

	@media (max-width: 450px) {

        .basicInfo {
            height: 20px;
        }

        .basicInfo span {
            font-size: 0.75em;
        }

        .infoTeam {
            height: 30px;
        }
	}

    @media (max-width: 370px) {

        .basicInfo {
            height: 18px;
        }

        .basicInfo span {
            font-size: 0.6em;
        }

        .infoTeam {
            height: 24px;
        }
    }
</style>

<div class="managerContainer managerConstrained"> {/* Added managerConstrained here for overall page width */}
    <div class="manager-header-card"> {/* Card for top info block */}
        <img class="managerPhoto" src="{viewManager.photo}" alt="{viewManager.name} avatar"/>
        <h2>
            {viewManager.name}
            <div class="teamSub">{coOwners ? 'Co-' : ''}Manager of <i>{getTeamNameFromTeamManagers(leagueTeamManagers, rosterID, year)}</i></div>
        </h2>
        
        <div class="basicInfo">
            <span class="infoChild"><Icon class="material-icons">location_on</Icon>{viewManager.location || 'Undisclosed Location'}</span>

            {#if viewManager.managerID && datesActive.start}
                <span class="seperator">|</span>
                <span class="infoChild">
                    <Icon class="material-icons">date_range</Icon>
                    {#if datesActive.end}
                        In league: '{datesActive.start.toString().substr(2)} to '{datesActive.end.toString().substr(2)}
                    {:else}
                        In league since: '{datesActive.start.toString().substr(2)}
                    {/if}
                </span>
            {:else if viewManager.fantasyStart}
                <span class="seperator">|</span>
                <span class="infoChild"><Icon class="material-icons">sports_football</Icon>Playing FF since: '{viewManager.fantasyStart.toString().substr(2)}</span>
            {/if}

            {#if viewManager.preferredContact}
                <span class="seperator">|</span>
                <span class="infoChild">
                    {#if viewManager.preferredContact === 'discord' || viewManager.preferredContact === 'twitter' || viewManager.preferredContact === 'facebook' || viewManager.preferredContact === 'instagram'}
                        <img class="infoContact" src="/{viewManager.preferredContact}.png" alt="{viewManager.preferredContact} icon"/>
                         {viewManager.preferredContact.charAt(0).toUpperCase() + viewManager.preferredContact.slice(1)}
                    {:else}
                        <Icon class="material-icons">contact_mail</Icon>{viewManager.preferredContact}
                    {/if}
                </span>
            {/if}

            {#if viewManager.favoriteTeam}
                <span class="seperator">|</span>
                <span class="infoChild">
                    <Icon class="material-icons">sports_football</Icon> NFL Team:
                    <img class="infoTeam" src="https://sleepercdn.com/images/team_logos/nfl/{viewManager.favoriteTeam}.png" alt="favorite nfl team"/>
                </span>
            {/if}

            {#if commissioner}
                <span class="seperator">|</span>
                <div class="infoChild commissionerBadge" title="League Commissioner">
                    <Icon class="material-icons" style="color: white; font-size: 1.1em;">admin_panel_settings</Icon>
                </div>
            {/if}
        </div>
    </div>

    <div class="managerNav upper">
        <Group variant="outlined">
            <Button disabled={manager == 0} class="selectionButtons" on:click={() => changeManager(parseInt(manager) - 1, true)} variant="outlined">
                <Label>Previous Manager</Label>
            </Button>
            <Button class="selectionButtons" on:click={() => goto('/managers')} variant="outlined">
                <Label>All Managers</Label>
            </Button>
            <Button disabled={manager == managers.length - 1} class="selectionButtons" on:click={() => changeManager(parseInt(manager) + 1, true)} variant="outlined">
                <Label>Next Manager</Label>
            </Button>
        </Group>
    </div>

    <div class="manager-section-card"> {/* Card for Bio and Philosophy */}
        <h3>About {viewManager.name.split(' ')[0]}</h3>
        <p class="bio">{@html viewManager.bio}</p>
        {#if viewManager.philosophy}
            <h3>Team Philosophy</h3>
            <p class="philosophy">{@html viewManager.philosophy}</p>
        {/if}
    </div>

    {#if !loading}
        <div class="manager-section-card"> {/* Card for Fantasy Info */}
            <ManagerFantasyInfo {viewManager} {players} {changeManager} />
        </div>
    {/if}

    <div class="manager-section-card"> {/* Card for Awards */}
        <ManagerAwards {leagueTeamManagers} tookOver={viewManager.tookOver} {awards} {records} {rosterID} managerID={viewManager.managerID} />
    </div>

    {#if loading}
        <div class="loading manager-section-card">
            <p>Loading Roster...</p>
            <LinearProgress indeterminate />
        </div>
    {:else}
        <div class="manager-section-card">
            <div class="section-title-header">
                <h3>Current Roster</h3>
                <Button variant="outlined" on:click={() => goto(`/rosters?manager=${rosterID}`)}> {/* Assuming rosterID can be used here */}
                    <Label>View Full Roster</Label>
                </Button>
            </div>
            <Roster division="1" expanded={false} {rosterPositions} {roster} {leagueTeamManagers} {players} {startersAndReserve} />
        </div>
    {/if}

    <div class="manager-section-card">
        <div class="section-title-header">
            <h3>Recent Transactions</h3> {/* Changed title slightly */}
            <Button variant="outlined" on:click={() => goto(`/transactions?manager=${rosterID}`)}>  {/* Assuming rosterID can be used here */}
                <Label>View All Transactions</Label>
            </Button>
        </div>
        {#if loading} {/* Kept loading check here as transactions might still be loading if players loaded first */}
            <div class="loading">
                <p>Loading Transactions...</p>
                <LinearProgress indeterminate />
            </div>
        {:else}
            <TransactionsPage {playersInfo} transactions={teamTransactions} {leagueTeamManagers} show='both' query='' page={0} perPage={5} />
        {/if}
    </div>

    <div class="managerNav">
        <Group variant="outlined">
             <Button disabled={manager == 0} class="selectionButtons" on:click={() => changeManager(parseInt(manager) - 1)} variant="outlined">
                <Label>Previous Manager</Label>
            </Button>
            <Button class="selectionButtons" on:click={() => goto('/managers')} variant="outlined">
                <Label>All Managers</Label>
            </Button>
            <Button disabled={manager == managers.length - 1} class="selectionButtons" on:click={() => changeManager(parseInt(manager) + 1)} variant="outlined">
                <Label>Next Manager</Label>
            </Button>
        </Group>
    </div>
</div>