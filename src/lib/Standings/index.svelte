<script>
    import { leagueName, round } from '$lib/utils/helper';
	import { getTeamFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';
  	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import { Icon } from '@smui/icon-button'; // Import SMUI Icon
	import LinearProgress from '@smui/linear-progress';
    import { onMount } from 'svelte';
    import Standing from './Standing.svelte';

    export let standingsData, leagueTeamManagersData;

    // Least important to most important (i.e. the most important [usually wins] goes last)
    // Edit this to match your leagues settings
    const sortOrder = ["fptsAgainst", "divisionTies", "divisionWins", "fpts", "ties", "wins"];

    // Column order from left to right
    const columnOrder = [{name: "W", field: "wins"}, {name: "T", field: "ties"}, {name: "L", field: "losses"}, {name: "Div W", field: "divisionWins"}, {name: "Div T", field: "divisionTies"}, {name: "Div L", field: "divisionLosses"}, {name: "FPTS", field: "fpts"}, {name: "FPTS Against", field: "fptsAgainst"}, {name: "Streak", field: "streak"}]

    let loading = true;
    let preseason = false;
    let standings, year, leagueTeamManagers, originalStandings; // Store original for re-sorting

    let sortColumn = "wins"; // Default sort column (usually wins)
    let sortDirection = "desc"; // Default sort direction

    onMount(async () => {
        const asyncStandingsData = await standingsData;
        if(!asyncStandingsData) {
            loading = false;
            preseason = true;
            return;
        }
        const {standingsInfo, yearData} = asyncStandingsData;
        leagueTeamManagers = await leagueTeamManagersData;
        year = yearData;

        let finalStandings = Object.keys(standingsInfo).map((key) => standingsInfo[key]);

        for(const sortType of sortOrder) {
            if(!finalStandings[0][sortType] && finalStandings[0][sortType] != 0) {
                continue;
            }
            finalStandings = [...finalStandings].sort((a,b) => b[sortType] - a[sortType]);
        }

        originalStandings = finalStandings; // Keep a copy of the initially sorted standings
        standings = [...originalStandings]; // Initialize displayed standings
        // Apply default sort (wins, desc) or the last user sort if implemented
        applySort();
        loading = false;
    })

    function applySort() {
        if (!originalStandings) return;

        standings = [...originalStandings].sort((a, b) => {
            let valA = a[sortColumn];
            let valB = b[sortColumn];

            // Handle 'Streak' specifically if it's like "W2" or "L1"
            if (sortColumn === 'streak') {
                const parseStreak = (streakStr) => {
                    if (!streakStr) return 0;
                    const type = streakStr.charAt(0);
                    const num = parseInt(streakStr.substring(1), 10);
                    return type === 'W' ? num : -num;
                };
                valA = parseStreak(valA);
                valB = parseStreak(valB);
            }

            // Basic numeric comparison
            if (typeof valA === 'number' && typeof valB === 'number') {
                return sortDirection === 'asc' ? valA - valB : valB - valA;
            }

            // Basic string comparison (case-insensitive)
            if (typeof valA === 'string' && typeof valB === 'string') {
                valA = valA.toLowerCase();
                valB = valB.toLowerCase();
                if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
                if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            }

            // Fallback for mixed types or other types (less ideal)
            return 0;
        });
    }

    function handleSort(columnField) {
        if (sortColumn === columnField) {
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            sortColumn = columnField;
            sortDirection = 'desc'; // Default to descending for new column
        }
        applySort();
    }

    let innerWidth;

</script>

<svelte:window bind:innerWidth={innerWidth} />

<style>
    .loading {
        display: block;
        width: 85%;
        max-width: 500px;
        margin: 80px auto;
    }

    :global(.center) {
        text-align: center;
    }

    .header-clickable {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
		gap: 4px; /* Space between text and icon */
    }

    .sort-icon {
        font-size: 1.1rem !important; /* SMUI default might be too large */
        height: 1.1rem !important;
        width: 1.1rem !important;
        vertical-align: middle;
		opacity: 0.6;
    }

	.active-sort-icon {
		opacity: 1;
	}

    :global(.wrappable) {
        white-space: normal;
        line-height: 1.2em;
    }

    /* Styles for sticky header cells */
    :global(.standingsTable .mdc-data-table__header-cell) {
        position: sticky;
        top: 0;
        background-color: var(--surface, #ffffff); /* Ensure background matches theme */
        z-index: 2; /* Ensure header is above body content */
        border-bottom: 1px solid var(--borderOverride, #ddd); /* Optional: re-add bottom border if needed */
		padding-top: 4px !important; /* Adjust padding for sort icon */
		padding-bottom: 4px !important;
    }

    /* Styles for alternating row colors */
    :global(.standingsTable .mdc-data-table__content .mdc-data-table__row:nth-child(even)) {
        background-color: var(--f8f8f8); /* Or a dedicated theme variable for striped rows */
    }
    /* Ensure hover/selection styles still work if SMUI provides them */
    :global(.standingsTable .mdc-data-table__content .mdc-data-table__row:hover) {
        background-color: var(--ebebeb); /* Example hover color, adjust as needed */
    }


    h1 {
        font-size: 2.2em;
        line-height: 1.3em;
        margin: 1.5em 0 2em;
    }

    .standingsTable {
        max-width: 100%;
        overflow-x: auto; /* Changed from scroll to auto for better behavior */
        margin: 0.5em 0 5em;
        position: relative; /* Needed for visual cues if implemented with pseudo-elements */
    }

    /* Basic visual cue for horizontal scroll - a shadow on the right */
    /* This is a simplified version. More complex JS-driven cues can be added if needed. */
    .standingsTable::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 30px; /* Width of the shadow/gradient */
        pointer-events: none; /* So it doesn't interfere with scrolling */
        /* Apply gradient only when overflowing - this part is tricky with pure CSS */
        /* As a simple cue, this shadow will always be there if overflow-x is auto and content is wide */
        /* A more advanced solution would use JS to check scrollWidth > clientWidth */
        background: linear-gradient(to left, rgba(0,0,0,0.07), transparent);
        /* Initially hide it if not overflowing - requires JS or more complex CSS */
        /* visibility: hidden; */
    }

    /* A more robust way for scroll cues often involves JS to add/remove a class */
    /* For example, if JS adds a 'is-scrollable' class: */
    /* .standingsTable.is-scrollable::after { visibility: visible; } */

</style>

<h1>{year ?? ''} {leagueName} Standings</h1>

{#if loading}
    <!-- promise is pending -->
    <div class="loading">
        <p>Loading Standings...</p>
        <LinearProgress indeterminate />
    </div>
{:else if preseason}
<div class="loading">
    <p>Preseason, No Standings Yet</p>
</div>
{:else}
    <div class="standingsTable">
        <DataTable table$aria-label="League Standings">
            <Head>
                <Row>
                    <Cell class="center">Team</Cell> {/* Non-sortable */}
                    {#each columnOrder as column (column.field)}
                        <Cell
                            class="center wrappable"
                            on:click={() => handleSort(column.field)}
                            on:keypress={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSort(column.field); }}
                            role="button"
                            tabindex="0"
                            aria-label="Sort by {column.name}"
                            aria-sort="{sortColumn === column.field ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}"
                        >
                            <span class="header-clickable">
                                {column.name}
                                <Icon class="material-icons sort-icon {sortColumn === column.field ? 'active-sort-icon' : ''}" aria-hidden="true">
                                    {#if sortColumn === column.field}
                                        {sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                                    {:else}
                                        unfold_more {/* Indicates sortable but not currently sorted */}
                                    {/if}
                                </Icon>
                            </span>
                        </Cell>
                    {/each}
                </Row>
            </Head>
            <Body>
                {#each standings as standing (standing.rosterID)}
                    <Standing {columnOrder} {standing} {leagueTeamManagers} team={getTeamFromTeamManagers(leagueTeamManagers, standing.rosterID)} />
                {/each}
            </Body>
        </DataTable>
    </div>
{/if}
