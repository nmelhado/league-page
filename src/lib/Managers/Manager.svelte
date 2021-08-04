<script>
    import Button, { Group, Label } from '@smui/button';
	import LinearProgress from '@smui/linear-progress';
    import {loadPlayers} from '$lib/utils/helper';
	import Roster from '../Rosters/Roster.svelte';
	import TransactionsPage from '../Transactions/TransactionsPage.svelte';
    import { goto } from '$app/navigation';
    import ManagerFantasyInfo from './ManagerFantasyInfo.svelte';
    import ManagerAwards from './ManagerAwards.svelte';

    export let manager, managers, rostersData, users, rosterPositions, transactions, currentManagers, awards, records;

    let viewManager = managers[manager];

    let teamTransactions = transactions.filter(t => t.rosters.indexOf(viewManager.roster) > -1);

    let startersAndReserve = rostersData.startersAndReserve;
    let rosters = rostersData.rosters;

    let rosterArrNum = viewManager.roster-1;

    let roster = rosters[rosterArrNum];

    let user = users[roster.owner_id];

    const playerData = loadPlayers();

    const changeManager = (newManager, noscroll = false) => {
        manager = newManager;
        viewManager = managers[newManager];

        teamTransactions = transactions.filter(t => t.rosters.indexOf(viewManager.roster) > -1);

        startersAndReserve = rostersData.startersAndReserve;
        rosters = rostersData.rosters;

        rosterArrNum = viewManager.roster-1;

        roster = rosters[rosterArrNum];

        user = users[roster.owner_id];
        goto(`/managers?manager=${manager}`, {noscroll})
    }

    let el, masterOffset, innerWidth;

    const setOffset = (w) => {
        return el?.getBoundingClientRect() ? el?.getBoundingClientRect().left  : 0;
    }

    $: masterOffset = setOffset(innerWidth);
</script>

<svelte:window bind:innerWidth={innerWidth} />

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

    hr {
        border-style: ridge;
    }

    /* media queries */

    @media (max-width: 490px) {
        :global(.selectionButtons span) {
            font-size: 0.8em;
        }
    }

    @media (max-width: 420px) {
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

<div class="managerContainer">
    <div class="managerConstrained">
        <img class="managerPhoto" src="{viewManager.photo}" alt="manager"/>
        <h2>
            {viewManager.name}
            <div class="teamSub">{roster.co_owners ? 'Co-' : ''}Manager of <i>{user.metadata.team_name ? user.metadata.team_name : user.display_name}</i></div>
        </h2>
        
        <div class="basicInfo">
            <span class="infoChild">{viewManager.location}</span>
            {#if viewManager.fantasyStart}
                <!-- fantasyStart is an optional field -->
                <span class="seperator">|</span>
                <span class="infoChild">Playing ff since '{viewManager.fantasyStart.toString().substr(2)}</span>
            {/if}
            <span class="seperator">|</span>
            <span class="infoChild">{viewManager.preferredContact}</span>
            {#if viewManager.favoriteTeam}
                <!-- favoriteTeam is an optional field -->
                <span class="seperator">|</span>
                <img class="infoChild infoTeam" src="https://sleepercdn.com/images/team_logos/nfl/{viewManager.favoriteTeam}.png" alt="favorite team"/>
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

        <p class="bio">{viewManager.bio}</p>

        <h3>Team Philosophy</h3>
        <p class="philosophy">{viewManager.philosophy}</p>
    </div>

    {#await playerData}
        <!-- Do nothing -->
    {:then players}
        <!-- Favorite player -->
        <ManagerFantasyInfo {viewManager} {players} />
    {/await}

    <ManagerAwards tookOver={viewManager.tookOver} {awards} {records} {roster} />

    {#await playerData}
        <!-- promise is pending -->
        <div class="loading">
            <p>Retrieving players...</p>
            <LinearProgress indeterminate />
        </div>
    {:then players}
        <Roster division="threeHundred" expanded={false} {rosterPositions} {roster} {users} {players} {startersAndReserve} />
    {/await}
    <h3>Team Transactions</h3>
    <div class="managerConstrained" bind:this={el}>
        <TransactionsPage transactions={teamTransactions} {currentManagers} {masterOffset} show='both' query='' page={0} perPage={5} />
    </div>

    <hr />

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

</div>