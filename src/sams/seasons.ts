import { z } from "zod";
import type { SamsQuery } from "../types";
import { verifyCredentials } from "../utils/credentials";
import { xmlParser } from "../utils/xml-parser";

// Season item schema
const SeasonSchema = z.object({
	id: z.number(),
	name: z.string(),
	begin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
	end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
});

// Root schema matching the entire JSON structure
const SeasonsResponseSchema = z.object({
	// "?xml": z.string(),
	seasons: z.object({
		season: z.array(SeasonSchema),
	}),
});

// Inferred TypeScript types
export type Season = z.infer<typeof SeasonSchema>;
type SeasonsResponse = z.infer<typeof SeasonsResponseSchema>;

// query function
export async function seasons(props?: SamsQuery): Promise<Season[]> {
	try {
		// validate credentials
		const { apiKey, serverUrl } = verifyCredentials(props?.apiKey, props?.serverUrl);

		// fetch remove data
		const api = await fetch(`${serverUrl}/xml/seasons.xhtml?apiKey=${apiKey}`);
		const xmlData = await api.text();

		// check if the resonse includes an error
		if (xmlData.includes("<error>")) throw "Error fetching data from SAMS server.";

		// parse xml to json
		const json: SeasonsResponse = xmlParser.parse(xmlData);

		// validate Json
		const validatedJson: Season[] = SeasonsResponseSchema.parse(json).seasons.season;

		// sort json by begin date (descending - most recent/future dates first)
		const sortedSeason = validatedJson.sort((a, b) => {
			const dateA = new Date(a.begin);
			const dateB = new Date(b.begin);
			return dateB.getTime() - dateA.getTime(); // Reversed comparison order
		});

		// return json
		return sortedSeason;
	} catch (error) {
		console.error("Error fetching seasons:", error);
		throw error;
	}
}
