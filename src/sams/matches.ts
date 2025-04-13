import { z } from "zod";
import type { SamsQuery } from "../types/servers";
import { verifyCredentials } from "../utils/credentials";
import { xmlParser } from "../utils/xml-parser";

// Define the Zod schemas
const TeamInMatchSchema = z.object({
	id: z.number().optional(),
	uuid: z.string().optional(),
	name: z.string().optional(),
	shortName: z.string().optional(),
	club: z.object({
		name: z.string().optional(),
		shortName: z.string().optional(),
	}),
});

const HostSchema = z.object({
	id: z.number(),
	uuid: z.string(),
	name: z.string(),
	club: z.string(),
});

const LocationSchema = z.object({
	id: z.number(),
	name: z.string(),
	street: z.string(),
	extraField: z.string(),
	postalCode: z.union([z.number(), z.string()]),
	city: z.string(),
	note: z.string(),
});

const MatchSeriesSchema = z.object({
	id: z.number(),
	uuid: z.string(),
	allSeasonId: z.string(),
	name: z.string(),
	shortName: z.string(),
	type: z.string(),
	updated: z.string(),
	structureUpdated: z.string(),
	resultsUpdated: z.string(),
	season: z.object({
		name: z.string(),
	}),
	hierarchy: z
		.object({
			hierarchyLevel: z.number(),
		})
		.optional(),
	fullHierarchy: z.object({}).optional(),
	association: z.object({}).optional(),
});

const ResultsSchema = z.object({
	winner: z.number(),
	setPoints: z.string(),
	ballPoints: z.string(),
	sets: z.object({}).optional(),
	verified: z.boolean(),
});

const MatchSchema = z.object({
	id: z.number(),
	uuid: z.string(),
	number: z.number(),
	date: z.string(),
	time: z.string(),
	delayPossible: z.boolean(),
	decidingMatch: z.boolean(),
	indefinitelyRescheduled: z.boolean(),
	gameReassessed: z.boolean(),
	host: HostSchema,
	team: z.array(TeamInMatchSchema),
	matchSeries: MatchSeriesSchema,
	location: LocationSchema,
	referees: z.object({
		referee: z.array(z.object({})).optional(),
	}),
	results: ResultsSchema,
	spectators: z.number(),
	netDuration: z.number(),
});

const MatchesSchema = z.object({
	match: z.array(MatchSchema),
});

const MatchesResponseSchema = z.object({
	matches: MatchesSchema,
});

// Infer types from Zod schemas
type TeamInMatch = z.infer<typeof TeamInMatchSchema>;
type Host = z.infer<typeof HostSchema>;
type Location = z.infer<typeof LocationSchema>;
type MatchSeries = z.infer<typeof MatchSeriesSchema>;
type Results = z.infer<typeof ResultsSchema>;
type Match = z.infer<typeof MatchSchema>;
export type Matches = z.infer<typeof MatchesSchema>;
type MatchesResponse = z.infer<typeof MatchesResponseSchema>;

const DatePropSchema = z.string().refine((value) => /^\d{2}\.\d{2}\.\d{4}$/.test(value) || /^\d{4}-\d{2}-\d{2}$/.test(value), {
	message: "Date must be in 'tt.mm.jjjj' or 'jjjj-mm-tt' format",
});

// query function
type MatchesProps = SamsQuery &
	({ matchSeriesId: string | number; allSeasonMatchSeriesId?: never } | { allSeasonMatchSeriesId: string; matchSeriesId?: never }) & {
		teamId?: string | number;
		before?: string;
		after?: string;
		past?: boolean;
		future?: boolean;
		limit?: number;
	};
export async function matches(props: MatchesProps): Promise<Match[]> {
	try {
		// input validation
		if (!props.matchSeriesId && !props.allSeasonMatchSeriesId) throw "Either matchSeriesId or allSeasonMatchSeriesId is required!";
		const before = props.before ? DatePropSchema.parse(props.before) : undefined;
		const after = props.after ? DatePropSchema.parse(props.after) : undefined;

		// validate credentials
		const { apiKey, serverUrl } = verifyCredentials(props?.apiKey, props?.serverUrl);

		// prepare optional parameters
		let optionalParams = "";
		if (props?.matchSeriesId) optionalParams += `&matchSeriesId=${props.matchSeriesId}`;
		if (props?.allSeasonMatchSeriesId) optionalParams += `&allSeasonMatchSeriesId=${props.allSeasonMatchSeriesId}`;
		if (props?.teamId) optionalParams += `&teamId=${props.teamId}`;
		if (before) optionalParams += `&before=${before}`;
		if (after) optionalParams += `&after=${after}`;
		if (props?.past) optionalParams += `&past=true`;
		if (props?.future) optionalParams += `&future=true`;
		if (props?.limit) optionalParams += `&limit=${props.limit}`;

		// fetch remove data
		const api = await fetch(`${serverUrl}/xml/matches.xhtml?apiKey=${apiKey}${optionalParams}`);
		const xmlData = await api.text();

		// check if the resonse includes an error
		if (xmlData.includes("<error>")) throw "Error fetching data from SAMS server.";

		// parse xml to json
		const json: MatchesResponse = xmlParser.parse(xmlData);

		// validate Json
		const validatedJson: Match[] = MatchesResponseSchema.parse(json).matches.match;

		// return matches array
		return validatedJson;
	} catch (error) {
		console.error("Error fetching matches:", error);
		throw error;
	}
}

matches({ allSeasonMatchSeriesId: "42b97d58-e625-c49d-468c-8804db710db3" }).then((data) => Bun.write("./examples/matches.json", JSON.stringify(data, null, 2)));
