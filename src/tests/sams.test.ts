import { describe, expect, test } from "bun:test";
import { sams, type SamsMatchSeries, type SamsSeason, type SamsSimpleSportsClub } from "..";

// variables to use across different tests
let matchSeries: SamsMatchSeries[] = [];
let seasonId: number = 0;
let seasosn: SamsSeason[];
let sportsclubList: SamsSimpleSportsClub[] = [];
let sportsclubId: SamsSimpleSportsClub["id"] = 0;
let sportsclubName: SamsSimpleSportsClub["name"] = "";
let allSeasonMatchSeriesId: SamsMatchSeries["allSeasonId"] = "";

describe("Match Series", () => {
	test("Test if the match series RPC is working.", async () => {
		const data = await sams.matchSeries({});
		expect(data).toBeArray();
		expect(data[0]).toBeObject();
		expect(data[0]).toContainKeys(["id", "uuid", "allSeasonId", "name", "type", "updated", "structureUpdated", "resultsUpdated", "season", "hierarchy", "association"]);
		// store data for subsequent tests
		matchSeries = data;
		seasonId = data[0].season.id;
	});

	test("Test if the match series RPC is working with a seasonId.", async () => {
		// test value from previous test
		expect(seasonId).toBeNumber();
		expect(seasonId).toBeGreaterThan(0);

		const data = await sams.matchSeries({ seasonId: seasonId });
		expect(data).toBeArray();
		expect(data[0].season.id).toBe(seasonId);
	});
});

describe("Seasons", () => {
	test("Test if the seasons RPC is working.", async () => {
		const data = await sams.seasons({});
		expect(data).toBeArray();
		expect(data[0]).toBeObject();
		expect(data[0]).toContainKeys(["id", "name", "begin", "end"]);
		expect(data[0].id).toBeNumber();

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
		const randomClub = data[randomArrayEntry];

		expect(randomClub).toBeObject();
		expect(randomClub).toContainKeys(["id", "name", "lsbNumber", "internalSportsclubId", "association"]);
		expect(randomClub.id).toBeNumber();
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
		expect(sportsclubId).toBeNumber();
		expect(sportsclubId).toBeGreaterThan(0);
		expect(sportsclubName).toBeString();

		const data = await sams.sportsclub({ sportsclubId: sportsclubId });

		expect(data).toBeObject();
		expect(data).toContainKeys(["id", "name", "association", "teams"]);
		expect(data.id).toBe(sportsclubId);
		expect(data.name).toBe(sportsclubName);

		// teams can be either a (empty) string, a single team object or a team array
		if (typeof data.teams === "object") {
			expect(data.teams).toBeObject();
			if (typeof data.teams.team === "object") {
				expect(data.teams.team[0]).toBeObject();
				expect(data.teams.team[0]).toContainKeys(["id", "uuid", "seasonTeamId", "name", "matchSeries", "allSeasonId"]);
				expect(data.teams.team[0].matchSeries).toContainKeys(["allSeasonId"]);

				// store the allSeasonId for later use
				allSeasonMatchSeriesId = data.teams.team[0].matchSeries.allSeasonId;
			}
		} else if (typeof data.teams === "string") {
			expect(data.teams).toBeString();
			expect(data.teams).toHaveLength(0); // verfies the empty string
		}
	});
});

describe("Rankings", () => {
	// this test can only run if the previous test was successful and the allSeasonId is available
	if (allSeasonMatchSeriesId.length > 0) {
		test("Test if the rankings RPC is working.", async () => {
			// test value from previous test
			expect(allSeasonMatchSeriesId).toBeString();

			const data = await sams.rankings({ allSeasonMatchSeriesId: allSeasonMatchSeriesId });

			expect(data).toBeObject();
			expect(data).toContainKeys(["rankings", "matchSeries"]);
			expect(data.ranking).toBeArray();

			if (data.ranking.length > 0) {
				expect(data.matchSeries).toContainKeys(["id", "uuid", "name", "type", "updated", "season"]);
				expect(data.matchSeries.allSeasonId).toBe(allSeasonMatchSeriesId);
				expect(data.ranking[0]).toBeObject();
				expect(data.ranking[0]).toContainKeys(["team", "rank", "points", "games", "wins", "draws", "losses", "goalsFor", "goalsAgainst", "goalDifference"]);
				expect(data.ranking[0].team).toBeObject();
				expect(data.ranking[0].team).toContainKeys(["id", "uuid", "name"]);
				expect(data.ranking[0].team.name).toBeString();
				expect(data.ranking[0].team.id).toBeNumber();
			}
		});
	}
});
