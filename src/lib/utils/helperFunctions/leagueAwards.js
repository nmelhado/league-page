import { getLeagueData } from './leagueData';
import { getLeagueRosters } from './leagueRosters';
import { getLeagueUsers } from './leagueUsers';
import {waitForAll} from './multiPromise';
import { get } from 'svelte/store';
import {awards} from '$lib/stores';

export const getAwards = async () => {
	if(get(awards).podiums) {
		return get(awards);
	}
	const [rosterRes, users, leagueData] = await waitForAll(
		getLeagueRosters(),
		getLeagueUsers(),
		getLeagueData()
	).catch((err) => { console.error(err); });

	const rosters = rosterRes.rosters;

	const currentManagers = {};

	for(const roster of rosters) {
		const user = users[roster.owner_id];
		if(user) {
			currentManagers[roster.roster_id] = {
				avatar: `https://sleepercdn.com/avatars/thumbs/${user.avatar}`,
				name: user.metadata.team_name ? user.metadata.team_name : user.display_name,
			}
		} else {
			currentManagers[roster.roster_id] = {
				avatar: `https://sleepercdn.com/images/v2/icons/player_default.webp`,
				name: 'Unknown Manager',
			}
		}
	}

	let previousSeasonID = leagueData.previous_league_id;

	const podiums = [];

	while(previousSeasonID && previousSeasonID != 0) {
		const resPromises = [
			fetch(`https://api.sleeper.app/v1/league/${previousSeasonID}`, {compress: true}),
			getLeagueRosters(previousSeasonID),
			getLeagueUsers(previousSeasonID),
			fetch(`https://api.sleeper.app/v1/league/${previousSeasonID}/losers_bracket`, {compress: true}),
			fetch(`https://api.sleeper.app/v1/league/${previousSeasonID}/winners_bracket`, {compress: true}),
		]

		const [leagueRes, rostersData, usersData, losersRes, winnersRes] = await waitForAll(...resPromises).catch((err) => { console.error(err); });

		if(!leagueRes.ok || !losersRes.ok || !winnersRes.ok) {
			throw new Error(data);
		}

		const jsonPromises = [
			leagueRes.json(),
			losersRes.json(),
			winnersRes.json(),
		]
	
		const [prevLeagueData, losersData, winnersData] = await waitForAll(...jsonPromises).catch((err) => { console.error(err); });

		const year = prevLeagueData.season;

		const previousRosters = rostersData.rosters;
	
		const prevManagers = {};

		const numDivisions = leagueData.settings.divisions || 1;

		const divisions = {};

		for(let i = 0; i < numDivisions; i++) {
			divisions[i+1] = {
				name: leagueData.metadata ? leagueData.metadata[`division_${i + 1}`] : null,
				roster: null,
				wins: -1,
				points: -1
			}
		}
	
		for(const roster of previousRosters) {
			const rSettings = roster.settings;
			const div = rSettings.division ? rSettings.division : 1;
			if(rSettings.wins > divisions[div].wins || (rSettings.wins == divisions[div].wins && (rSettings.fpts  + rSettings.fpts_decimal / 100)  == divisions[div].points)) {
				divisions[div].points = rSettings.fpts  + rSettings.fpts_decimal / 100;
				divisions[div].wins = rSettings.wins;
				divisions[div].roster = roster.roster_id;
			}
			const user = usersData[roster.owner_id];
			if(user) {
				prevManagers[roster.roster_id] = {
					rosterID: roster.roster_id,
					avatar: `https://sleepercdn.com/avatars/thumbs/${user.avatar}`,
					name: user.metadata.team_name ? user.metadata.team_name : user.display_name,
				}
			} else {
				prevManagers[roster.roster_id] = {
					rosterID: roster.roster_id,
					avatar: `https://sleepercdn.com/images/v2/icons/player_default.webp`,
					name: 'Unknown Manager',
				}
			}
		}

		// add manager to division obj and convert to array
		const divisionArr = []
		for(const key in divisions) {
			divisions[key].manager = prevManagers[divisions[key].roster];
			divisionArr.push(divisions[key]);
		}

		const finalsMatch = winnersData.filter(m => m.r == 3 && m.t1_from.w)[0];
		const champion = prevManagers[finalsMatch.w];
		const second = prevManagers[finalsMatch.l];
	
		const runnersUpMatch = winnersData.filter(m => m.r == 3 && m.t1_from.l)[0];
		const third = prevManagers[runnersUpMatch.w];

		const toiletBowlMatch = losersData.filter(m => m.r == 3 && m.t1_from.w)[0];
		const toilet = prevManagers[toiletBowlMatch.w]

		const podium = {
			year,
			champion,
			second,
			third,
			divisions: divisionArr,
			toilet
		}
		podiums.push(podium);

		previousSeasonID = prevLeagueData.previous_league_id;
	}

	const gatheredAwards = {
		podiums,
		currentManagers
	};

	awards.update(() => gatheredAwards);

	return gatheredAwards;
}