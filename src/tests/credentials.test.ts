import { describe, expect, test } from "bun:test";
import { SamsServers } from "../enums";
import { verifyCredentials } from "../utils/credentials";

describe("Credentials check", () => {
	test("Test if the environmental variables pass the credentials check.", () => {
		const { apiKey, serverUrl } = verifyCredentials();
		expect(apiKey).toBeString();
		// biome-ignore lint/style/noNonNullAssertion: env secret
		expect(apiKey).toBe(process.env.SAMS_API_KEY!);
		expect(serverUrl).toBeString();
		// biome-ignore lint/style/noNonNullAssertion: env secret
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
