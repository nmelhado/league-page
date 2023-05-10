<script>
	import Button, { Group, Label } from '@smui/button';
	import LinearProgress from '@smui/linear-progress';
	import {loadPlayers, getLeagueTransactions} from '$lib/utils/helper';
	import Roster from '../Rosters/Roster.svelte';
	import TransactionsPage from '../Transactions/TransactionsPage.svelte';
	import { goto } from '$app/navigation';
	import ManagerFantasyInfo from './ManagerFantasyInfo.svelte';
	import ManagerAwards from './ManagerAwards.svelte';
	import { onMount } from 'svelte';
	import { getDatesActive, getRosterIDFromManagerID, getTeamNameFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';
	import { getAvatarFromTeamManagers, getNestedTeamNamesFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';

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
        manager = newManager;

        goto(`/manager?manager=${manager}`, {noscroll})
    }
</script>

<style>
	.managerContainer {
	width: 100%;
	margin: 2em 0 5em;
	}

	.managerConstrained {
	width: 97%;
	max-width: 800px;
	margin: 0 auto 4em;
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
	color: #888;
	font-size: 0.9em;
	}

	.infoChild {
	font-style: italic;
	}

	.infoContact {
	height: 20px;
	vertical-align: middle;
	padding-left: 1em;
	}

	.infoTeam {
	height: 48px;
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

	.fantasyInfos {
	display: flex;
	justify-content: space-around;
	align-items: flex-start;
	flex-wrap: wrap;
	padding: 0 0 2em;
	margin: 3em 0 4em;
	border-bottom: 1px solid var(--aaa);
	border-top: 1px solid var(--aaa);
	box-shadow: 0 0 8px 4px var(--ccc);
	}

	.infoSlot {
	text-align: center;
	margin: 2em 1em 0;
	}

	.infoIcon {
	display: inline-flex;
	height: 70px;
	width: 70px;
	justify-content: center;
	align-items: center;
	border-radius: 100%;
	border: 1px solid var(--ccc);
	overflow: hidden;
	background-color: var(--fff);
	transition: box-shadow 0.4s;
	}

	.playerIcon {
	align-items:flex-end;
	}

	.infoLabel {
	font-size: 0.7em;
	color: var(--blueOne);
	font-weight: 700;
	margin-bottom: 1em;
	height: 30px;
	width: 90px;
	text-align: center;
	line-height: 1.2em;
	}

	.infoAnswer {
	font-size: 0.8em;
	color: var(--g555);
	margin-top: 1em;
	width: 90px;
	text-align: center;
	line-height: 1.2em;
	}

	.tradingScale {
	line-height: 70px;
	font-size: 55px;
	color: var(--blueOne);
	}

	.rookiesOrVets {
	height: 65px;
	vertical-align: middle;
	}

	.infoRival {
	cursor: pointer;
	}

	.infoRival:hover .infoIcon {
	box-shadow: 0 0 6px 4px var(--aaa);
	border: 1px solid var(--aaa);
	}

	.rival {
	height: 100%;
	}

	.rebuildOrWin {
	height: 70px;
	}

	.valuePosition {
	line-height: 70px;
	font-size: 25px;
	color: var(--fff);
	}

	.QB {
	background-color: var(--QB);
	}

	.WR {
	background-color: var(--WR);
	}

	.RB {
	background-color: var(--RB);
	}

	.TE {
	background-color: var(--TE);
	}

	.Picks {
	background: #73b647;
	}
	.K {
	background-color: var(--K);
	}

	.DEF {
	background-color: var(--DEF);
	}

	.CB {
	background-color: #ffcc7a;
	}

	.SS {
	background-color: #b7a1db;
	}

	.FS {
	background-color: #ebe7b3;
	}

	.DE {
	background-color: #b1d0e9;
	}

	.DL {
	background-color: #c392d3;
	}

	.LB {
	background-color: #98c097;
	}

	.favoritePlayer {
	height: 65px;
	vertical-align: bottom;
	}

	/* media queries */

	@media (max-width: 731px) {
	.infoSlot {
	margin: 2em 3em 0;
	}
	}

	@media (max-width: 558px) {
	.infoSlot {
	margin: 2em 2em 0;
	}
	}

	@media (max-width: 461px) {
	.infoSlot {
	margin: 2em 1em 0;
	}
	}
</style>

<div class="managerContainer">
    <div class="managerConstrained">
		<img src="{getAvatarFromTeamManagers(leagueTeamManagers, rosterID, year)}" class="managerPhoto" alt="manager"/>
        <h2>
            {viewManager.name}
            <div class="teamSub">{coOwners ? 'Co-' : ''}Manager of <i>{getTeamNameFromTeamManagers(leagueTeamManagers, rosterID, year)}</i></div>
        </h2>
        
        <div class="basicInfo">
            <span class="infoChild">{viewManager.location || 'Undisclosed Location'}</span>
            {#if viewManager.managerID && datesActive.start}
                <span class="seperator">|</span>
                {#if datesActive.end}
                    <span class="infoChild">In the league from '{datesActive.start.toString().substr(2)} to '{datesActive.end.toString().substr(2)}</span>
                {:else}
                    <span class="infoChild">In the league since '{datesActive.start.toString().substr(2)}</span>
                {/if}
            {:else if viewManager.fantasyStart}
                <!-- fantasyStart is an optional field -->
                <span class="seperator">|</span>
                <span class="infoChild">Playing ff since '{viewManager.fantasyStart.toString().substr(2)}</span>
            {/if}
            {#if viewManager.preferredContact}
                <!-- preferredContact is an optional field -->
                <span class="seperator">|</span>
                <span class="infoChild">{viewManager.preferredContact}<img class="infoChild infoContact" src="/{viewManager.preferredContact}.png" alt="favorite team"/></span>
            {/if}
            <!-- <span class="infoChild">{viewManager.preferredContact}</span> -->
            {#if viewManager.favoriteTeam}
                <!-- favoriteTeam is an optional field -->
                <span class="seperator">|</span>
                <img class="infoChild infoTeam" src="https://sleepercdn.com/images/team_logos/nfl/{viewManager.favoriteTeam}.png" alt="favorite team"/>
            {/if}
            {#if commissioner}
                <span class="seperator">|</span>
                <div class="infoChild commissionerBadge">
                    <span>C</span>
                </div>
            {/if}
        </div>

        <div class="managerNav upper">
            <Group variant="outlined">
                {#if manager == 0}
                    <Button disabled class="selectionButtons" on:click={() => changeManager(parseInt(manager) - 1, true)} variant="outlined">
                        <Label>Previous Manager</Label>
                    </Button>
                {:else}
                    <Button class="selectionButtons" on:click={() => changeManager(parseInt(manager) - 1, true)} variant="outlined">
                        <Label>Previous Manager</Label>
                    </Button>
                {/if}
                <Button class="selectionButtons" on:click={() => goto('/managers')} variant="outlined">
                    <Label>All Managers</Label>
                </Button>
                {#if manager == managers.length - 1}
                    <Button disabled class="selectionButtons" on:click={() => changeManager(parseInt(manager) + 1, true)} variant="outlined">
                        <Label>Next Manager</Label>
                    </Button>
                {:else}
                    <Button class="selectionButtons" on:click={() => changeManager(parseInt(manager) + 1, true)} variant="outlined">
                        <Label>Next Manager</Label>
                    </Button>
                {/if}
            </Group>
        </div>

        <p class="bio">{@html viewManager.bio}</p>

        {#if viewManager.philosophy}
            <!-- philosophy is an optional field -->
            <h3>Team Philosophy</h3>
            <p class="philosophy">{@html viewManager.philosophy}</p>
        {/if}
    </div>

    {#if !loading}
        <!-- Favorite player -->
        <ManagerFantasyInfo {viewManager} {players} />
    {/if}

    <ManagerAwards {leagueTeamManagers} tookOver={viewManager.tookOver} {awards} {records} {rosterID} managerID={viewManager.managerID} />

    {#if loading}
        <!-- promise is pending -->
        <div class="loading">
            <p>Retrieving players...</p>
            <LinearProgress indeterminate />
        </div>
    {:else}
        <Roster division="1" expanded={false} {rosterPositions} {roster} {leagueTeamManagers} {players} {startersAndReserve} />
    {/if}

    <h3>Team Transactions</h3>
    <div class="managerConstrained">
        {#if loading}
            <!-- promise is pending -->
            <div class="loading">
                <p>Retrieving players...</p>
                <LinearProgress indeterminate />
            </div>
        {:else}
            <TransactionsPage {playersInfo} transactions={teamTransactions} {leagueTeamManagers} show='both' query='' page={0} perPage={5} />
        {/if}
    </div>

    <div class="managerNav">
        <Group variant="outlined">
            {#if manager == 0}
                <Button disabled class="selectionButtons" on:click={() => changeManager(parseInt(manager) - 1)} variant="outlined">
                    <Label>Previous Manager</Label>
                </Button>
            {:else}
                <Button class="selectionButtons" on:click={() => changeManager(parseInt(manager) - 1)} variant="outlined">
                    <Label>Previous Manager</Label>
                </Button>
            {/if}
            <Button class="selectionButtons" on:click={() => goto('/managers')} variant="outlined">
                <Label>All Managers</Label>
            </Button>
            {#if manager == managers.length - 1}
                <Button disabled class="selectionButtons" on:click={() => changeManager(parseInt(manager) + 1)} variant="outlined">
                    <Label>Next Manager</Label>
                </Button>
            {:else}
                <Button class="selectionButtons" on:click={() => changeManager(parseInt(manager) + 1)} variant="outlined">
                    <Label>Next Manager</Label>
                </Button>
            {/if}
        </Group>
    </div>
	<div class="fantasyInfos">
		<!-- Rookies or Vets (optional) -->
		{#if viewManager.rookieOrVets}
		<div class="infoSlot">
			<div class="infoLabel">
				Rookie or Vet Preference
			</div>
			<div class="infoIcon">
				<img class="rookiesOrVets" src="/{viewManager.rookieOrVets}.png" alt="rookie or vet preference"/>
			</div>
			<div class="infoAnswer">
				{viewManager.rookieOrVets}
			</div>
		</div>
		{/if}
		<!-- Favorite fantasy position (optional) -->
		{#if viewManager.valuePosition}
		<div class="infoSlot">
			<div class="infoLabel">
				Favorite Fantasy Asset
			</div>
			<div class="infoIcon {viewManager.valuePosition}">
				<span class="valuePosition">{viewManager.valuePosition}</span>
			</div>
		</div>
		{/if}
		{#if viewManager.tradingScale}
		<!-- Trading Scale -->
		<div class="infoSlot">
			<div class="infoLabel">
				Desire to Trade
			</div>
			<div class="infoIcon">
				<span class="tradingScale">{viewManager.tradingScale}</span>
			</div>
			<div class="infoAnswer">
				{viewManager.tradingScale} out of 10
			</div>
		</div>
		{/if}
		<!-- Favorite player (optioonal) -->
		{#if viewManager.favoritePlayer}
		<div class="infoSlot">
			<div class="infoLabel">
				Favorite Player
			</div>
			<div class="infoIcon playerIcon">
				<img class="favoritePlayer" src="https://sleepercdn.com/content/nfl/players/{viewManager.favoritePlayer}.jpg" alt="favorite player"/>
			</div>
			<div class="infoAnswer">
				{players[viewManager.favoritePlayer].fn} {players[viewManager.favoritePlayer].ln}
			</div>
		</div>
		{/if}
		<!-- Rebuild Mod (optional) -->
		{#if viewManager.mode}
		<div class="infoSlot">
			<div class="infoLabel">
				Win Now or Rebuild?
			</div>
			<div class="infoIcon">
				<img class="rebuildOrWin" src="/{viewManager.mode.replace(' ', '%20')}.png" alt="win now or rebuild"/>
			</div>
			<div class="infoAnswer">
				{viewManager.mode}
			</div>
		</div>
		{/if}
		<!-- Rival -->
		<div class="infoSlot infoRival" on:click=""{() =>
			gotoRival(viewManager.rival.link)}>
			<div class="infoLabel">
				Rival
			</div>
			<div class="infoIcon">
				<img class="rival" src="{viewManager.rival.image}" alt="rival"/>
			</div>
			<div class="infoAnswer">
				{viewManager.rival.name}
			</div>
		</div>
	</div>
</div>