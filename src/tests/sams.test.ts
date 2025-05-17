import { describe, expect, test } from "bun:test";
import { type MatchSeries, type Season, type SimpleSportsClub, sams } from "..";

// variables to use across different tests
let matchSeries: MatchSeries[] = [];
let seasonId = "";
let seasosn: Season[];
let sportsclubList: SimpleSportsClub[] = [];
let sportsclubId: SimpleSportsClub["id"] = "";
let sportsclubName: SimpleSportsClub["name"] = "";
let allSeasonMatchSeriesId: MatchSeries["allSeasonId"] = "";

describe("Match Series", () => {
	test("Test if the match series RPC is working.", async () => {
		const data = await sams.matchSeries({});
		expect(data).toBeArray();
		expect(data[0]).toBeObject();
		expect(data[0]).toContainKeys([
			"id",
			"uuid",
			"allSeasonId",
			"name",
			"type",
			"updated",
			"structureUpdated",
			"resultsUpdated",
			"season",
			"hierarchy",
			"association",
		]);
		// store data for subsequent tests
		matchSeries = data;
		seasonId = data[0].season.id;
	});

	test("Test if the match series RPC is working with a seasonId.", async () => {
		// test value from previous test
		expect(seasonId).toBeString();
		expect(seasonId.length).toBeGreaterThan(0);

		const data = await sams.matchSeries({ seasonId: seasonId });
		expect(data).toBeArray();
		expect(data[0].season.id).toBe(seasonId);
	});
});

describe("Seasons", () => {
	test("Test if the seasons RPC is working.", async () => {
		const data = await sams.seasons({});
		expect(data).toBeArray();
		const randomArrayEntry = Math.floor(Math.random() * data.length);
		const randomSeason = data[randomArrayEntry];
		expect(randomSeason).toBeObject();
		expect(randomSeason).toContainKeys(["id", "name", "begin", "end"]);
		expect(randomSeason.id).toBeString();
		expect(randomSeason.id.length).toBeGreaterThan(0);

		// store data for subsequent tests
		seasosn = data;
	});

	test("Test if the seasons RPC included the previous season ID.", async () => {
		expect(JSON.stringify(seasosn)).toInclude(seasonId.toString());
	});
});

describe("Sportsclub List", () => {
	test("Test if the sportsclub list RPC is working.", async () => {
		const data = await sams.sportsclubList({});
		expect(data).toBeArray();

		// pick a club at random. this makes the test fuzzy.
		const randomArrayEntry = Math.floor(Math.random() * data.length);
		// const randomClub = data[randomArrayEntry];
		const randomClub = data[randomArrayEntry];
		console.log(`Random Club used for testing: ${randomClub.name} (${randomClub.association?.name})`);

		expect(randomClub).toBeObject();
		expect(randomClub).toContainKeys(["id", "name", "lsbNumber", "internalSportsclubId", "association"]);
		expect(randomClub.id).toBeString();
		expect(randomClub.id.length).toBeGreaterThan(0);
		expect(randomClub.name).toBeString();

		// store data for subsequent tests
		sportsclubList = data;
		sportsclubId = randomClub.id;
		sportsclubName = randomClub.name;
	});
});

describe("Sportsclub", () => {
	test("Test if the sportsclub RPC is working.", async () => {
		// test value from previous test
		expect(sportsclubId).toBeString();
		expect(sportsclubId.length).toBeGreaterThan(0);
		expect(sportsclubName).toBeString();

		const data = await sams.sportsclub({ sportsclubId: sportsclubId });

		expect(data).toBeObject();
		expect(data).toContainKeys(["id", "name", "association", "teams"]);
		expect(data.id).toBe(sportsclubId);
		expect(data.name).toBe(sportsclubName);

		// teams can be either null or a team array
		if (!data.teams) {
			expect(data.teams).toBeNull();
		} else {
			expect(data.teams).toBeObject();
			expect(data.teams.team).toBeArray();
			const randomTeam = Math.floor(Math.random() * data.teams.team.length);
			const firstTeam = data.teams.team[randomTeam];
			expect(firstTeam).toBeObject();
			expect(firstTeam).toContainKeys(["id", "uuid", "seasonTeamId", "name", "matchSeries"]);
			expect(firstTeam.matchSeries).toContainKeys(["allSeasonId"]);
			// store the allSeasonId for later use
			allSeasonMatchSeriesId = firstTeam.matchSeries.allSeasonId;
		}
	});
});

// this test can only run if the previous test was successful and the allSeasonId is available
describe("Rankings", () => {
	test("Test if the rankings RPC is working.", async () => {
		if (allSeasonMatchSeriesId.length > 0) {
			// test value from previous test
			expect(allSeasonMatchSeriesId).toBeString();

			const data = await sams.rankings({ allSeasonMatchSeriesId: allSeasonMatchSeriesId });

			expect(data).toBeObject();
			expect(data).toContainKeys(["matchSeries"]);
			expect(data.ranking).toBeArray();

			if (data.ranking && data.ranking.length > 0) {
				expect(data.matchSeries).toContainKeys(["id", "uuid", "name", "type", "updated", "season"]);
				expect(data.matchSeries.allSeasonId).toBe(allSeasonMatchSeriesId);
				expect(data.ranking[0]).toBeObject();
				expect(data.ranking[0]).toContainKeys(["team", "place", "points", "matchesPlayed", "wins", "losses"]);
				expect(data.ranking[0].team).toBeObject();
				expect(data.ranking[0].team).toContainKeys(["id", "uuid", "name", "club"]);
				expect(data.ranking[0].team.name).toBeString();
				expect(data.ranking[0].team.id).toBeString();
				expect(data.ranking[0].team.id.length).toBeGreaterThan(0);
				expect(data.ranking[0].team.club).toBeString();
			}
		}
	});
});

// this test can only run if the previous test was successful and the allSeasonId is available
describe("Matches", () => {
	test("Test if the matches RPC is working.", async () => {
		if (allSeasonMatchSeriesId.length > 0) {
			// test value from previous test
			expect(allSeasonMatchSeriesId).toBeString();

			const data = await sams.matches({ allSeasonMatchSeriesId: allSeasonMatchSeriesId });

			expect(data).toBeArray();
			const randomMatch = Math.floor(Math.random() * data.length);
			const randomMatchData = data[randomMatch];
			expect(randomMatchData).toContainKeys(["id", "uuid", "date", "team"]);
			expect(randomMatchData.team).toBeArray();
			expect(randomMatchData.team[0]).toBeObject();
			expect(randomMatchData.team[0]).toContainKeys(["id", "uuid", "name", "club"]);
		}
	});
});
