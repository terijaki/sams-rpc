import { z } from "zod";
import { SimpleSportsclubSchema } from "../schemas";
import type { SamsQuery } from "../types";
import { verifyCredentials } from "../utils/credentials";
import { xmlParser } from "../utils/xml-parser";

// Define the schema for the sports clubs array
const SportsclubListResponseSchema = z.object({
	sportsclubs: z.object({
		sportsclub: z.array(SimpleSportsclubSchema),
	}),
});

// Infer TypeScript types from the Zod schemas
export type SimpleSportsClub = z.infer<typeof SimpleSportsclubSchema>;
type SportsclubListResponse = z.infer<typeof SportsclubListResponseSchema>;

// query function
export async function sportsclubList(props?: SamsQuery): Promise<SimpleSportsClub[]> {
	try {
		// validate credentials
		const { apiKey, serverUrl } = verifyCredentials(props?.apiKey, props?.serverUrl);

		// fetch remove data
		const api = await fetch(`${serverUrl}/xml/sportsclubList.xhtml?apiKey=${apiKey}`);
		const xmlData = await api.text();

		// check if the resonse includes an error
		if (xmlData.includes("<error>")) throw "Error fetching data from SAMS server.";

		// parse xml to json
		const json: SportsclubListResponse = xmlParser.parse(xmlData);

		// validate Json
		const validatedJson: SimpleSportsClub[] = SportsclubListResponseSchema.parse(json).sportsclubs.sportsclub;

		// return json
		return validatedJson;
	} catch (error) {
		console.error("Error fetching sportsclub list:", error);
		throw error;
	}
}
