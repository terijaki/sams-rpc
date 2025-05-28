import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { matchSeries } from "../src/sams/match-series";
import { matches } from "../src/sams/matches";
import { rankings } from "../src/sams/rankings";
import { seasons } from "../src/sams/seasons";
import { sportsclub } from "../src/sams/sportsclub";
import { sportsclubList } from "../src/sams/sportsclub-list";
import { teams } from "../src/sams/teams";

const EXAMPLE_CLUB_NAME = "VC Müllheim"; // used as starting point for examples
const OUTPUT_PATH = "examples";

async function updateSportsclubList() {
	try {
		// fetch data
		const data = await sportsclubList();
		// Write data to JSON file
		const fileName = "sportsclubList.json";
		const outputPath = join(process.cwd(), OUTPUT_PATH, fileName);
		writeFileSync(outputPath, JSON.stringify(data, null, 2));
		// log
		console.log(`✓ Updated ${outputPath}`);
		return data;
	} catch (error) {
		console.log(error);
	}
}

async function updateSportsclub(clubId: string) {
	try {
		// fetch data
		const data = await sportsclub({ sportsclubId: clubId });
		// Write data to JSON file
		const fileName = "sportsclub.json";
		const outputPath = join(process.cwd(), OUTPUT_PATH, fileName);
		writeFileSync(outputPath, JSON.stringify(data, null, 2));
		// log
		console.log(`✓ Updated ${outputPath} (${clubId})`);
		return data;
	} catch (error) {
		console.log(error);
	}
}

async function updateMatches(allSeasonMatchSeriesId: string) {
	try {
		// fetch data
		const data = await matches({ allSeasonMatchSeriesId });
		// Write data to JSON file
		const fileName = "matches.json";
		const outputPath = join(process.cwd(), OUTPUT_PATH, fileName);
		writeFileSync(outputPath, JSON.stringify(data, null, 2));
		// log
		console.log(`✓ Updated ${outputPath} (${allSeasonMatchSeriesId})`);
		return data;
	} catch (error) {
		console.log(error);
	}
}

async function updateRankings(allSeasonMatchSeriesId: string) {
	try {
		// fetch data
		const data = await rankings({ allSeasonMatchSeriesId });
		// Write data to JSON file
		const fileName = "rankings.json";
		const outputPath = join(process.cwd(), OUTPUT_PATH, fileName);
		writeFileSync(outputPath, JSON.stringify(data, null, 2));
		// log
		console.log(`✓ Updated ${outputPath} (${allSeasonMatchSeriesId})`);
		return data;
	} catch (error) {
		console.log(error);
	}
}

async function updateTeams(allSeasonMatchSeriesId: string) {
	try {
		// fetch data
		const data = await teams({ allSeasonMatchSeriesId });
		// Write data to JSON file
		const fileName = "teams.json";
		const outputPath = join(process.cwd(), OUTPUT_PATH, fileName);
		writeFileSync(outputPath, JSON.stringify(data, null, 2));
		// log
		console.log(`✓ Updated ${outputPath} (${allSeasonMatchSeriesId})`);
		return data;
	} catch (error) {
		console.log(error);
	}
}

async function updateSeasons() {
	try {
		// fetch data
		const data = await seasons();
		// Write data to JSON file
		const fileName = "seasons.json";
		const outputPath = join(process.cwd(), OUTPUT_PATH, fileName);
		writeFileSync(outputPath, JSON.stringify(data, null, 2));
		// log
		console.log(`✓ Updated ${outputPath}`);
		return data;
	} catch (error) {
		console.log(error);
	}
}

async function updateMatchSeries(seasonId?: string) {
	try {
		// fetch data
		const data = await matchSeries({ seasonId });
		// Write data to JSON file
		const fileName = "matchSeries.json";
		const outputPath = join(process.cwd(), OUTPUT_PATH, fileName);
		writeFileSync(outputPath, JSON.stringify(data, null, 2));
		// log
		console.log(`✓ Updated ${outputPath}`);
		return data;
	} catch (error) {
		console.log(error);
	}
}

// Run the update function if this script is executed directly
if (require.main === module) {
	updateSportsclubList() // sportsclub list
		.catch(console.error)
		.then((clubs) => {
			if (!clubs) return;
			const club = clubs.filter((c) => c.name === EXAMPLE_CLUB_NAME);
			const clubId = club[0]?.id;
			updateSportsclub(clubId) // sportsclub
				.catch(console.error)
				.then((club) => {
					if (!club) return;
					// filter the clubs highest ranking team
					const teams = club.teams?.team;
					if (!teams) return;
					const leagueTeams = teams.filter((team) => team.matchSeries.type.toLowerCase() === "league");
					// sort leagueTeams by team.matchSeries.hierarchy.hierarchyLevel (number)
					const sortedLeagueTeams = leagueTeams.sort(
						(a, b) => a.matchSeries.hierarchy.hierarchyLevel - b.matchSeries.hierarchy.hierarchyLevel,
					);
					const highestTeam = sortedLeagueTeams[0];
					const allSeasonMatchSeriesId = highestTeam.matchSeries.allSeasonId;

					updateMatches(allSeasonMatchSeriesId); // matches
					updateRankings(allSeasonMatchSeriesId); // rankings
					updateTeams(allSeasonMatchSeriesId); // teams
				});
		});

	updateSeasons() // seasons
		.catch(console.error)
		.then((seasons) => {
			const seasonId = seasons?.[0]?.id;
			updateMatchSeries(seasonId); // matchSeries
		});
}
