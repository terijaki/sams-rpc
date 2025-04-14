import { z } from "zod";
import { SportsclubSchema } from "../schemas";
import type { SamsQuery } from "../types";
import { verifyCredentials } from "../utils/credentials";
import { xmlParser } from "../utils/xml-parser";

// schemas
const SportsclubResponseSchema = z.object({
	sportsclub: SportsclubSchema,
});

// Inferred TypeScript types
export type Sportsclub = z.infer<typeof SportsclubSchema>;
type SportsclubResponse = z.infer<typeof SportsclubResponseSchema>;

// query function
type SportsclubProps = SamsQuery & { sportsclubId: string | number };
export async function sportsclub(props: SportsclubProps): Promise<Sportsclub> {
	try {
		if (!props.sportsclubId) throw "sportsclubId is required!";

		// validate credentials
		const { apiKey, serverUrl } = verifyCredentials(props?.apiKey, props?.serverUrl);

		// prepare optional parameters
		let requiredParams = "";
		if (props?.sportsclubId) requiredParams += `&sportsclubId=${props.sportsclubId}`;

		// fetch remove data
		const api = await fetch(`${serverUrl}/xml/sportsclub.xhtml?apiKey=${apiKey}${requiredParams}`);
		const xmlData = await api.text();

		// check if the resonse includes an error
		if (xmlData.includes("<error>")) throw "Error fetching data from SAMS server.";

		// parse xml to json
		const json: SportsclubResponse = xmlParser.parse(xmlData);

		// validate Json
		const validatedJson: Sportsclub = SportsclubResponseSchema.parse(json).sportsclub;

		// return json
		return validatedJson;
	} catch (error) {
		console.error("Error fetching sportsclub:", error);
		throw error;
	}
}
