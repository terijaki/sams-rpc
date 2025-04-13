import { z } from "zod";
import type { SamsQuery } from "../types/servers";
import { verifyCredentials } from "../utils/credentials";
import { xmlParser } from "../utils/xml-parser";

// Define the schema for a single sports club
const SportsClubSchema = z.object({
	id: z.number(),
	name: z.string().optional(),
	lsbNumber: z.union([z.string(), z.number()]).optional(),
	internalSportsclubId: z.union([z.string(), z.number()]).optional(),
	association: z
		.object({
			id: z.number().optional(),
			name: z.string().optional(),
		})
		.optional(),
});

const SportsClubArraySchema = z.array(SportsClubSchema);

// Define the schema for the sports clubs array
const SportsClubResponseSchema = z.object({
	// "?xml": z.string(),
	sportsclubs: z.object({
		sportsclub: SportsClubArraySchema,
	}),
});

// Infer TypeScript types from the Zod schemas
type SportsClub = z.infer<typeof SportsClubSchema>;
export type SportsClubArray = z.infer<typeof SportsClubArraySchema>;
type SportsClubsResponse = z.infer<typeof SportsClubResponseSchema>;

// query function
export async function sportsclubList(props?: SamsQuery): Promise<SportsClubArray> {
	try {
		// validate credentials
		const { apiKey, serverUrl } = verifyCredentials(props?.apiKey, props?.serverUrl);

		// fetch remove data
		const api = await fetch(`${serverUrl}/xml/sportsclubList.xhtml?apiKey=${apiKey}`);
		const xmlData = await api.text();

		// check if the resonse includes an error
		if (xmlData.includes("<error>")) throw "Error fetching data from SAMS server.";

		// parse xml to json
		const json: SportsClubsResponse = xmlParser.parse(xmlData);

		// validate Json
		const validatedJson: SportsClubArray = SportsClubResponseSchema.parse(json).sportsclubs.sportsclub;

		// return json
		return validatedJson;
	} catch (error) {
		console.error("Error fetching sportsclubs:", error);
		throw error;
	}
}
