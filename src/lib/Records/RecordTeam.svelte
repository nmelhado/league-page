<script>
	import { getAvatarFromTeamManagers, getTeamNameFromTeamManagers, renderManagerNames } from "$lib/utils/helperFunctions/universalFunctions";

    export let leagueTeamManagers, rosterID, year, compressed = false, points = null;
</script>

<style>
	.teamAvatar {
		vertical-align: middle;
		border-radius: 50%;
		height: 40px;
		margin-right: 15px;
		border: 0.25px solid #777;
	}

    .recordTeam {
        display: flex;
    }

    .name {
        margin: auto 0;
    }

    .managerNames {
        font-size: 0.75em;
        font-style: italic;
        color: var(--g999);
        max-width: 180px;
        white-space: normal;
        text-align: left;
    }

    .compressed {
		height: 30px;
		margin-right: 6px;
    }

</style>

<div class="recordTeam">
    <img alt="team avatar" class="teamAvatar{compressed ? " compressed" : ""}" src="{getAvatarFromTeamManagers(leagueTeamManagers, rosterID, year)}" />
    <span class="name">
        <div class="teamName">
            {getTeamNameFromTeamManagers(leagueTeamManagers, rosterID, year)}
            {points ? ` (${points})` : ""}
        </div>
        <div class="managerNames">
            {renderManagerNames(leagueTeamManagers, rosterID, year)}
        </div>
    </span>
</div>