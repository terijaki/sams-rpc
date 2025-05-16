import { z } from "zod";
import { type RankingSchema, RankingsSchemaContent } from "../schemas";
import type { SamsQuery } from "../types";
import { verifyCredentials } from "../utils/credentials";
import { xmlParser } from "../utils/xml-parser";

// Define the Zod schemas
const RankingsResponseSchema = z.object({
	rankings: RankingsSchemaContent,
});

// Infer types from schemas
export type Ranking = z.infer<typeof RankingSchema>;
export type Rankings = z.infer<typeof RankingsSchemaContent>;
type RankingsResponse = z.infer<typeof RankingsResponseSchema>;

// query function
type RankingsProps = SamsQuery & ({ matchSeriesId: string | number; allSeasonMatchSeriesId?: never } | { allSeasonMatchSeriesId: string; matchSeriesId?: never });
export async function rankings(props: RankingsProps): Promise<Rankings> {
	try {
		// input validation
		if (!props.matchSeriesId && !props.allSeasonMatchSeriesId) throw "Either matchSeriesId or allSeasonMatchSeriesId is required!";

		// validate credentials
		const { apiKey, serverUrl } = verifyCredentials(props?.apiKey, props?.serverUrl);

		// prepare optional parameters
		let optionalParams = "";
		if (props?.matchSeriesId) optionalParams += `&matchSeriesId=${props.matchSeriesId}`;
		if (props?.allSeasonMatchSeriesId) optionalParams += `&allSeasonMatchSeriesId=${props.allSeasonMatchSeriesId}`;

		// fetch remove data
		const api = await fetch(`${serverUrl}/xml/rankings.xhtml?apiKey=${apiKey}${optionalParams}`);
		const xmlData = await api.text();

		// check if the resonse includes an error
		if (xmlData.includes("<error>")) throw "Error fetching data from SAMS server.";

		// parse xml to json
		const json: RankingsResponse = xmlParser.parse(xmlData);

		// validate Json
		const validatedJson: Rankings = RankingsResponseSchema.parse(json).rankings;

		// return rankings array
		return validatedJson;
	} catch (error) {
		console.error("Error fetching rankings:", error);
		throw error;
	}
}
