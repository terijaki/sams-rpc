import { describe, expect, test } from "bun:test";
import { SamsServers } from "../enums";
import { matchSeries } from "../sams/match-series";
import { verifyCredentials } from "../utils/credentials";
import { xmlParser } from "../utils/xml-parser";

describe("Credentials check", () => {
	test("Test if the environmental variables pass the credentials check.", () => {
		const { apiKey, serverUrl } = verifyCredentials();
		expect(apiKey).toBeString();
		expect(apiKey).toBe(process.env.SAMS_API_KEY!);
		expect(serverUrl).toBeString();
		expect(serverUrl).toBe(process.env.SAMS_SERVER!);
	});
	test("Test if the credentials check work with enums.", () => {
		const { apiKey, serverUrl } = verifyCredentials(undefined, SamsServers.BADEN);
		expect(apiKey).toBeString();
		expect(serverUrl).toBe(SamsServers.BADEN);
	});

	test("Test if the credentials check works with custom values.", () => {
		const { apiKey, serverUrl } = verifyCredentials("customApiKey", "https://example.com/");
		expect(apiKey).toBeString();
		expect(apiKey).toBe("customApiKey");
		expect(serverUrl).toBeString();
		expect(serverUrl).toBe("https://example.com"); // expect the trailing slash to be removed
	});
});

describe("XML parser", () => {
	test("Test if the xmal parser is working.", () => {
		const xml = `
			<clubs>
				<name>Value A</name>
				<name>Value B</name>
				<name>Value C</name>
				<team>
					<id>123456789</id>
					<name>Value D</name>
					<valid>true</valid>
					<invalid>false</invalid>
					<date>2023-10-01</date>
				</team>
			</clubs>
		`;
		const parsed = {
			clubs: {
				name: ["Value A", "Value B", "Value C"],
				team: {
					id: 123456789,
					name: "Value D",
					valid: true,
					invalid: false,
					date: "2023-10-01",
				},
			},
		};

		const result = xmlParser.parse(xml);
		expect(result).toEqual(parsed);
	});
	test("Test if the xmal parser is working with an empty string.", () => {
		const xml = "";
		const parsed = {};
		const result = xmlParser.parse(xml);
		expect(result).toEqual(parsed);
	});
	test("Test if the xmal parser is throwing an error with an undefined input.", () => {
		expect(() => xmlParser.parse(undefined!)).toThrow();
	});
});

describe("Match Series", () => {
	test("Test if the match series RPC is working.", async () => {
		const data = await matchSeries({});
		expect(data).toBeArray();
		expect(data[0]).toBeObject();
		expect(data[0]).toContainAllKeys(["id", "uuid", "allSeasonId", "name", "shortName", "type", "updated", "structureUpdated", "resultsUpdated", "season", "hierarchy"]);
	});

	test("Test if the match series RPC is working with a seasonId.", async () => {
		const seasonId2425 = 70098350; // this needs to be an actual seasonId or else the api will ignore the query param and return everything
		const data = await matchSeries({ seasonId: seasonId2425 });
		expect(data).toBeArray();
		expect(data[0].season.id).toBe(seasonId2425);
	});
});
