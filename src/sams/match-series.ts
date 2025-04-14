import { z } from "zod";
import type { SamsQuery } from "../types/servers";
import { verifyCredentials } from "../utils/credentials";
import { xmlParser } from "../utils/xml-parser";

// Season schema
const SeasonSchema = z.object({
	id: z.number(),
	uuid: z.string(),
	name: z.string(),
});
// MatchSeries schema
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
	season: SeasonSchema,
	hierarchy: z.unknown(), // Keep as unknown until structure is known
});
// MatchSeriesList schema
const MatchSeriesListSchema = z.object({
	matchSeries: z.array(MatchSeriesSchema),
});
// Root response schema
const MatchSeriesResponseSchema = z.object({
	// "?xml": z.string(),
	matchSeriesList: MatchSeriesListSchema,
});
// Types derived from schemas
type Season = z.infer<typeof SeasonSchema>;
export type MatchSeries = z.infer<typeof MatchSeriesSchema>;
type MatchSeriesList = z.infer<typeof MatchSeriesListSchema>;
type MatchSeriesResponse = z.infer<typeof MatchSeriesResponseSchema>;

// query function
type MatchSeriesProps = SamsQuery & { seasonId?: string | number };
export async function matchSeries(props?: MatchSeriesProps): Promise<MatchSeries[]> {
	try {
		// validate credentials
		const { apiKey, serverUrl } = verifyCredentials(props?.apiKey, props?.serverUrl);

		// prepare optional parameters
		let optionalParams = "";
		if (props?.seasonId) optionalParams += `&seasonId=${props.seasonId}`;

		// fetch remove data
		const api = await fetch(`${serverUrl}/xml/matchSeries.xhtml?apiKey=${apiKey}${optionalParams}`);
		const xmlData = await api.text();

		// check if the resonse includes an error
		if (xmlData.includes("<error>")) throw "Error fetching data from SAMS server.";

		// parse xml to json
		const json: MatchSeriesResponse = xmlParser.parse(xmlData);

		// validate Json
		const validatedJson: MatchSeries[] = MatchSeriesResponseSchema.parse(json).matchSeriesList.matchSeries;

		// return json
		return validatedJson;
	} catch (error) {
		console.error("Error fetching match series:", error);
		throw error;
	}
}
