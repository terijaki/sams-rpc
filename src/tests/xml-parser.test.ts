import { describe, expect, test } from "bun:test";
import { xmlParser } from "../utils/xml-parser";

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
