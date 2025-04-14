import { z } from "zod";
import { TeamSchema } from "../schemas";
import type { SamsQuery } from "../types";
import { verifyCredentials } from "../utils/credentials";
import { xmlParser } from "../utils/xml-parser";

// schemas
const TeamsResponseSchema = z.object({
	teams: z.object({
		team: z.array(TeamSchema),
	}),
});

// Infer types from schemas
export type Team = z.infer<typeof TeamSchema>;
type TeamsResponse = z.infer<typeof TeamsResponseSchema>;

// query function
type TeamsProps = SamsQuery & ({ matchSeriesId: string | number; allSeasonMatchSeriesId?: never } | { allSeasonMatchSeriesId: string; matchSeriesId?: never });
export async function teams(props: TeamsProps): Promise<Team[]> {
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
		const api = await fetch(`${serverUrl}/xml/teams.xhtml?apiKey=${apiKey}${optionalParams}`);
		const xmlData = await api.text();

		// check if the resonse includes an error
		if (xmlData.includes("<error>")) throw "Error fetching data from SAMS server.";

		// parse xml to json
		const json: TeamsResponse = xmlParser.parse(xmlData);

		// validate Json
		const validatedJson: Team[] = TeamsResponseSchema.parse(json).teams.team;

		// return teams array
		return validatedJson;
	} catch (error) {
		console.error("Error fetching teams:", error);
		throw error;
	}
}
