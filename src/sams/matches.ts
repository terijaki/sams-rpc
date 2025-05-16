import { z } from "zod";
import { MatchSchema } from "../schemas";
import type { SamsQuery } from "../types";
import { verifyCredentials } from "../utils/credentials";
import { xmlParser } from "../utils/xml-parser";

// Define the Zod schemas

const MatchesResponseSchema = z.object({
	matches: z.object({
		match: z.array(MatchSchema),
	}),
});

// Infer types from Zod schemas
export type Match = z.infer<typeof MatchSchema>;
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
		if (props?.past) optionalParams += "&past=true";
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
