import { z } from "zod";
import { MatchSeriesSchema } from "../schemas";
import type { SamsQuery } from "../types";
import { verifyCredentials } from "../utils/credentials";
import { xmlParser } from "../utils/xml-parser";

// Schemas
const MatchSeriesListSchema = z.object({
	matchSeries: z.array(MatchSeriesSchema),
});
const MatchSeriesResponseSchema = z.object({
	matchSeriesList: MatchSeriesListSchema,
});

// Types derived from schemas
export type MatchSeries = z.infer<typeof MatchSeriesSchema>;
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
