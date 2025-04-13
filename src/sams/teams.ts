import { z } from "zod";
import type { SamsQuery } from "../types/servers";
import { verifyCredentials } from "../utils/credentials";
import { xmlParser } from "../utils/xml-parser";

// Define the Zod schemas
const LogoSchema = z.object({
	url: z.string(),
});

const ClubSchema = z.object({
	name: z.string(),
	id: z.number(),
	shortName: z.string(),
	logo: LogoSchema,
	www: z.string(),
	wwwDepartment: z.string(),
});

const HierarchyItemSchema = z.object({
	id: z.number(),
	name: z.string(),
	shortName: z.string(),
	hierarchyLevel: z.number(),
});

const FullHierarchySchema = z.object({
	hierarchy: z.array(HierarchyItemSchema),
});

const AssociationSchema = z.object({
	name: z.string(),
	shortName: z.string(),
});

const SeasonSchema = z.object({
	id: z.number(),
	uuid: z.string(),
	name: z.string(),
});

const MatchSeriesDetailsSchema = z.object({
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
	hierarchy: HierarchyItemSchema,
	fullHierarchy: FullHierarchySchema,
	association: AssociationSchema,
});

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
	matchSeries: MatchSeriesDetailsSchema,
});

const TeamsSchema = z.object({
	team: z.array(TeamSchema),
});

const TeamsResponseSchema = z.object({
	// "?xml": z.string(),
	teams: TeamsSchema,
});

// Infer types from schemas
type Logo = z.infer<typeof LogoSchema>;
type Club = z.infer<typeof ClubSchema>;
type HierarchyItem = z.infer<typeof HierarchyItemSchema>;
type FullHierarchy = z.infer<typeof FullHierarchySchema>;
type Association = z.infer<typeof AssociationSchema>;
type Season = z.infer<typeof SeasonSchema>;
type MatchSeriesDetails = z.infer<typeof MatchSeriesDetailsSchema>;
export type Team = z.infer<typeof TeamSchema>;
type Teams = z.infer<typeof TeamsSchema>;
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
