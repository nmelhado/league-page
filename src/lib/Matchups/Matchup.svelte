<script>
    import {round} from '$lib/utils/helper'

    export let matchup, players, active, ix, displayWeek, expandOverride=false;

    let home = matchup[0];
    let away = matchup[1];

    let homePointsTotal = 0;
    let homeProjectionTotal = 0;
    let awayPointsTotal = 0;
    let awayProjectionTotal = 0;

    let winning = "home";

    const digestStarters = (x) => {
        home = matchup[0];
        away = matchup[1];
        const homeStarters = home.starters;
        const awayStarters = away.starters;
        const homePoints = home.points;
        const awayPoints = away.points;

        homePointsTotal = 0;
        homeProjectionTotal = 0;
        awayPointsTotal = 0;
        awayProjectionTotal = 0;

        const localStarters = [];
        for(let i = 0; i < homeStarters.length; i++) {
            homePointsTotal += homePoints[i];
            awayPointsTotal += awayPoints[i];
            const home = digestStarter(homeStarters[i], homePoints[i]);
            const away = digestStarter(awayStarters[i], awayPoints[i]);
            homeProjectionTotal += home.projection;
            awayProjectionTotal += away.projection;
            localStarters.push({home, away});
        }
        if(awayPointsTotal < homePointsTotal) winning = "home";
        if(awayPointsTotal > homePointsTotal) winning = "away";
        if(awayPointsTotal == homePointsTotal) winning = "tied";
        starters = localStarters;
    }

    const digestStarter = (starter, points) => {
        if(!starter || starter == 0) {
                return {
                    name: "Empty",
                    avatar: null,
                    positions: null,
                    team: null,
                    opponent: null,
                    projection: 0,
                    points: 0,
                };
            }
            const player = players[starter];
            let name = player.position == "DEF" ? player.last_name : `${player.first_name[0]}. ${player.last_name}`;
            let projection = 0;
            if(player.weeklyInfo[displayWeek]) {
                projection = parseFloat(player.weeklyInfo[displayWeek].projection);
            }
            return {
                name,
                avatar: player.position == "DEF" ? `background-image: url(https://sleepercdn.com/images/team_logos/nfl/${starter.toLowerCase()}.png)` : `background-image: url(https://sleepercdn.com/content/nfl/players/thumb/${starter}.jpg), url(https://sleepercdn.com/images/v2/icons/player_default.webp)`,
                position: player.position,
                team: player.team,
                opponent: player.weeklyInfo[displayWeek] ? player.weeklyInfo[displayWeek].opponent : null,
                projection,
                points,
            };
    }

    let starters;
    
    $: digestStarters(ix);

    let el;

    $: top = el?.getBoundingClientRect() ? el?.getBoundingClientRect().top  : 0;

    const expandClose = () => {
        if(expandOverride) return;
        active = active == ix ? null : ix;
        setTimeout( () => {
            window.scrollTo({left: 0, top, behavior: 'smooth'});
        }, 200);
        ;
    }
</script>

<style>
    .matchup {
        width: 95%;
        max-width: 600px;
        margin: 10px auto;
    }

    .header {
        display: flex;
        justify-content: space-between;
        position: relative;
        border: 1px solid #bbb;
        border-radius: 10px;
        opacity: 0.8;
        cursor: pointer;
		transition: opacity 0.5s;
    }

    .header:hover {
        opacity: 1;
    }

    .opponent {
        display: flex;
        align-items: center;
        width: 46%;
        padding: 5px 2%;
        top: 0;
        z-index: 2;
    }

    .divider {
        position: absolute;
        z-index: 3;
        transform: translateX(-50%);
        top: 0;
        left: 50%;
        height: 100%;
        width: 15px;
    }

    .home {
        justify-content: flex-start;
        left: 0;
        text-align: left;
        background-color: #485566;
    }

    :global(.homeGlow) {
        box-shadow: 0 0 6px 4px #3279cf;
        background-color: #00316b !important;
    }

    .away {
        justify-content: flex-end;
        right: 0;
        text-align: right;
        background-color: #8b6969;
    }

    :global(.awayGlow) {
        box-shadow: 0 0 6px 4px #d15454;
        background-color: #920505 !important;
    }

    .name {
        margin: 0 5px;
        font-size: 1em;
        line-height: 1.1em;
        flex-grow: 1;
        word-break: break-word;
        color: #fff;
        font-style: italic;
    }

	.avatar {
		vertical-align: middle;
		border-radius: 50%;
		height: 35px;
		width: 35px;
		margin: 0;
		border: 0.25px solid #777;
        background-color: #eee;
	}

	.playerAvatar {
		vertical-align: middle;
		height: 45px;
		width: 45px;
		background-position: center;
		background-repeat: no-repeat;
		background-size: auto 45px;
	}
	.position {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
        max-width: 32px;
        min-width: 32px;
		height: 32px;
	}

	:global(.QB) {
		background-color: #ff2a6d;
	}

	:global(.WR) {
		background-color: #58a7ff;
	}

	:global(.RB) {
		background-color: #00ceb8;
	}

	:global(.TE) {
		background-color: #ffae58;
	}

	:global(.FLEX) {
		background: linear-gradient(to right, #58a7ff, #58a7ff 33.33%, #00ceb8 33.33%, #00ceb8 66.66%, #ffae58 66.66%);
	}

	:global(.WRRB) {
		background: linear-gradient(to right, #58a7ff, #58a7ff 50%, #00ceb8 50%);
	}

	:global(.K) {
		background-color: #bd66ff;
	}

	:global(.DEF) {
		background-color: #fff67a;
	}

    .rosters {
        position: relative;
        background-color: var(--fff);
        border-radius: 8px;
        overflow: hidden;
        border-left: 1px solid #bbb;
        border-right: 1px solid #bbb;
        border-bottom: 1px solid #bbb;
		transition: max-height 0.4s;
    }

    .line {
        position: relative;
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #bbb;
    }

    .player {
        position: relative;
        width: 46%;
    }

    .iconAndTeam {
        display: flex;
        align-items: center;
    }

    .iconAndTeamHome {
        justify-content: flex-start;
    }

    .iconAndTeamAway {
        justify-content: flex-end;
    }

    .playerHome {
        padding: 0 1.5% 0 2.5%;
        text-align: left;
    }

    .playerAway {
        padding: 0 2.5% 0 1.5%;
        text-align: right;
    }

    .playerInfo {
        display: inline-block;
        padding: 0 6px;
    }

    .playerTeam {
        display: inline-block;
        color: #888;
        font-style: italic;
        text-align: center;
        font-size: 0.5em;
    }

    .playerName {
        word-break: break-word;
    }

    .playerNameHome {
        text-align: left;
    }

    .playerNameAway {
        text-align: right;
    }

    @media (max-width: 500px) {
        .name {
            font-size: 0.8em;
        }
        .totalPoints {
            font-size: 0.8em;
        }
        .nameHolder {
            font-size: 0.8em;
        }
        .points {
            font-size: 0.9em;
        }
    }

    @media (max-width: 410px) {
        .name {
            font-size: 0.7em;
        }
        .totalPoints {
            font-size: 0.7em;
        }
        .nameHolder {
            font-size: 0.7em;
        }
        .points {
            font-size: 0.75em;
        }
    }

    @media (max-width: 360px) {
        .name {
            font-size: 0.5em;
        }
        .totalPoints {
            font-size: 0.5em;
        }
    }

    .dividerLine {
        display: block;
        position: absolute;
        top: 0;
        left: 50%;
        height: 100%;
        width: 0;
        border-left: 1px solid var(--eee);
        z-index: 1;
    }

    .close {
        display: block;
        width: 100%;
        background-color: var(--eee);
        text-align: center;
        cursor: pointer;
        z-index: 2;
        font-size: 1.1em;
        padding: 6px 0;
    }

    .close:hover {
        background-color: var(--ddd);
    }

    .nameHolder {
        display: block;
    }

    .nameHolderR {
        justify-content: flex-end;
        text-align: right;
    }

    .nameHolderL {
        justify-content: flex-start;
        text-align: left;
    }

    .totalPoints {
        line-height: 1.1em;
        color: #fff;
    }

    .totalPointsR {
        margin-right: 0.1em;
        text-align: right;
    }

    .totalPointsL {
        margin-left: 0.1em;
        text-align: left;
    }

    .totalProjection {
        color: #ccc;
        font-size: 0.7em;
        font-style: italic;
    }

    .points {
        position: absolute;
        line-height: 1.1em;
        top: 1em;
    }

    .pointsL {
        left: 1em;
    }

    .pointsR {
        right: 1em;
    }

    .playerEmpty {
        height: 100%;
        color: #555;
        font-style: italic;
        display: flex;
        align-items: center;
    }
</style>

<div class="matchup">
    <div class="header" on:click={() => expandClose()} bind:this={el} >
        <div class="opponent home{winning == "home" ? " homeGlow" : ""}">
            <img class="avatar" src={home.manager.avatar} alt="home team avatar" />
            <div class="name">{home.manager.name}</div>
            <div class="totalPoints totalPointsR">{round(homePointsTotal)}<div class="totalProjection">{round(homeProjectionTotal)}</div></div>
        </div>
        <img class="divider" src="/{winning}Divider.jpg" alt="divider" />
        <div class="opponent away{winning == "away" ? " awayGlow" : ""}">
            <div class="totalPoints totalPointsL">{round(awayPointsTotal)}<div class="totalProjection">{round(awayProjectionTotal)}</div></div>
            <div class="name" >{away.manager.name}</div>
            <img class="avatar" src={away.manager.avatar} alt="away team avatar" />
        </div>
    </div>

    <div class="rosters" style="max-height: {active == ix ? "800px" : "0"}; {active != ix ? "border: none" : ""};">
        {#each starters as player}
            <div class="line">
                <div class="player playerHome">
                    <span class="iconAndTeam iconAndTeamHome">
                        {#if player.home.position}
                            <span class="position {player.home.position}">{player.home.position}</span>
                        {/if}
                        {#if player.home.avatar}
                            <div class="playerAvatar playerInfo" style="{player.home.avatar}" />
                        {/if}
                    </span>
                    <div class="nameHolder nameHolderL{player.home.name == 'Empty'? ' playerEmpty' : ''}">
                        <span class="playerInfo playerName playerNameHome">{player.home.name}</span>
                        {#if player.home.team}
                            {#if player.home.opponent}
                                <div class="playerTeam">{player.home.position != "DEF" ? `${player.home.team} ` : ""}vs {player.home.opponent}</div>
                            {:else}
                                <div class="playerTeam">{player.home.position != "DEF" ? player.home.team : ""}</div>
                            {/if}
                        {/if}
                    </div>
                    <span class="points pointsR">{round(player.home.points)}<div class="totalProjection">{round(player.home.projection)}</div></span>
                </div>

                <div class="dividerLine" />

                <div class="player playerAway">
                    <span class="iconAndTeam iconAndTeamAway">
                        {#if player.away.avatar}
                            <div class="playerAvatar playerInfo" style="{player.away.avatar}" />
                        {/if}
                        {#if player.away.position}
                            <span class="position {player.away.position}">{player.away.position}</span>
                        {/if}
                    </span>
                    <div class="nameHolder nameHolderR{player.away.name == 'Empty'? ' playerEmpty' : ''}">
                        {#if player.away.team}
                            {#if player.away.opponent}
                                <div class="playerTeam">{player.away.opponent} vs{player.away.position != "DEF" ? ` ${player.away.team}` : ""}</div>
                            {:else}
                                <div class="playerTeam">{player.away.position != "DEF" ? player.away.team : ""}</div>
                            {/if}
                        {/if}
                        <span class="playerInfo playerName playerNameAway">{player.away.name}</span>
                    </div>
                    <span class="points pointsL">{round(player.away.points)}<div class="totalProjection">{round(player.away.projection)}</div></span>
                </div>
            </div>
        {/each}
        {#if !expandOverride}
            <div class="close" on:click={() => expandClose()}>Close Matchup</div>
        {/if}
    </div>
</div>