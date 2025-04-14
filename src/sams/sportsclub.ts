import { z } from "zod";
import type { SamsQuery } from "../types/servers";
import { verifyCredentials } from "../utils/credentials";
import { xmlParser } from "../utils/xml-parser";

// Logo schema
const LogoSchema = z.object({
	url: z.string().url(),
	filename: z.string().optional(),
	createDate: z.string().optional(),
});

// Address schema
const AddressSchema = z.object({
	postbox: z.string(),
	street: z.string(),
	extraField: z.string(),
	postcode: z.union([z.string(), z.number()]),
	city: z.string(),
	region: z.string(),
	country: z.string(),
});

// Association schema
const AssociationSchema = z.object({
	name: z.string().optional(),
	shortName: z.string().optional(),
});

// Hierarchy item schema
const HierarchyItemSchema = z.object({
	id: z.number(),
	name: z.string(),
	shortName: z.string(),
	hierarchyLevel: z.number(),
});

// Season schema
const SeasonSchema = z.object({
	id: z.number(),
	uuid: z.string(),
	name: z.string(),
});

// Full hierarchy schema
const FullHierarchySchema = z.object({
	hierarchy: z.array(HierarchyItemSchema),
});

// Match series schema
const MatchSeriesSchema = z.object({
	id: z.number(),
	uuid: z.string(),
	allSeasonId: z.string(),
	name: z.string(),
	shortName: z.string(),
	type: z.string(),
	updated: z.string(),
	structureUpdated: z.string(),
	resultsUpdated: z.string().optional(),
	season: SeasonSchema,
	hierarchy: HierarchyItemSchema,
	fullHierarchy: FullHierarchySchema,
	association: AssociationSchema,
});

// Club schema
const ClubSchema = z.object({
	name: z.string(),
	id: z.number(),
	shortName: z.string(),
	logo: LogoSchema,
	www: z.string(),
	wwwDepartment: z.string(),
});

// Team schema
const TeamSchema = z.object({
	id: z.number(),
	uuid: z.string(),
	seasonTeamId: z.number(),
	placeCipher: z.number(),
	name: z.string(),
	shortName: z.string(),
	clubCode: z.string(),
	status: z.string(),
	www: z.string(),
	logo: LogoSchema,
	club: ClubSchema,
	matchSeries: MatchSeriesSchema,
});

// Teams schema
const TeamsSchema = z.object({
	team: z.array(TeamSchema),
});

// Match operation company schema
const MatchOperationCompanySchema = z.object({
	id: z.string(),
	name: z.string(),
	address: AddressSchema,
	homepage: z.string(),
});

// Location schema
const LocationSchema = z.object({
	id: z.number(),
	name: z.string(),
	address: AddressSchema,
	homepage: z.string(),
});

// Locations schema
const LocationsSchema = z.object({
	main: LocationSchema,
});

// Sportsclub schema
const SportsclubSchema = z.object({
	id: z.number(),
	name: z.string(),
	logo: LogoSchema,
	lsbNumber: z.union([z.string(), z.number()]).optional(),
	internalSportsclubId: z.union([z.string(), z.number()]).optional(),
	association: AssociationSchema.optional(),
	matchOperationCompany: MatchOperationCompanySchema,
	teams: TeamsSchema,
	locations: LocationsSchema,
});

// Root schema matching the entire JSON structure
const SportsclubResponseSchema = z.object({
	sportsclub: SportsclubSchema,
});

// Inferred TypeScript types
type Logo = z.infer<typeof LogoSchema>;
type Address = z.infer<typeof AddressSchema>;
type Association = z.infer<typeof AssociationSchema>;
type HierarchyItem = z.infer<typeof HierarchyItemSchema>;
type FullHierarchy = z.infer<typeof FullHierarchySchema>;
type MatchSeries = z.infer<typeof MatchSeriesSchema>;
type Team = z.infer<typeof TeamSchema>;
type Club = z.infer<typeof ClubSchema>;
type Location = z.infer<typeof LocationSchema>;
type Locations = z.infer<typeof LocationsSchema>;
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
		// Bun.write("./examples/sportsclub.json", JSON.stringify(json, null, 2));

		// validate Json
		const validatedJson: Sportsclub = SportsclubResponseSchema.parse(json).sportsclub;

		// return json
		return validatedJson;
	} catch (error) {
		console.error("Error fetching sportsclub:", error);
		throw error;
	}
}
