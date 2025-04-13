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
	shortName: z.string(),
	id: z.number().optional(),
	logo: LogoSchema.optional(),
	www: z.string().optional(),
	wwwDepartment: z.string().optional(),
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

const TeamInfoSchema = z.object({
	id: z.number(),
	uuid: z.string(),
	name: z.string(),
	shortName: z.string(),
	clubCode: z.string(),
	club: ClubSchema,
});

const MatchResultSchema = z.object({
	result: z.string(),
	count: z.number(),
});

const ResultTypesSchema = z.object({
	matchResult: z.array(MatchResultSchema),
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

const RankingSchema = z.object({
	team: TeamInfoSchema,
	place: z.number(),
	matchesPlayed: z.number(),
	wins: z.number(),
	losses: z.number(),
	points: z.number(),
	setPoints: z.string(),
	setWinScore: z.number(),
	setLoseScore: z.number(),
	setPointDifference: z.number(),
	setQuotient: z.string(),
	ballPoints: z.string(),
	ballWinScore: z.number(),
	ballLoseScore: z.number(),
	ballPointDifference: z.number(),
	ballQuotient: z.string(),
	resultTypes: ResultTypesSchema,
});

const RankingsSchemaContent = z.object({
	matchSeries: MatchSeriesDetailsSchema,
	ranking: z.array(RankingSchema),
});

const RankingsResponseSchema = z.object({
	// "?xml": z.string(),
	rankings: RankingsSchemaContent,
});

// Infer types from schemas
type Logo = z.infer<typeof LogoSchema>;
type Club = z.infer<typeof ClubSchema>;
type HierarchyItem = z.infer<typeof HierarchyItemSchema>;
type FullHierarchy = z.infer<typeof FullHierarchySchema>;
type Association = z.infer<typeof AssociationSchema>;
type Season = z.infer<typeof SeasonSchema>;
type TeamInfo = z.infer<typeof TeamInfoSchema>;
type MatchResult = z.infer<typeof MatchResultSchema>;
type ResultTypes = z.infer<typeof ResultTypesSchema>;
type MatchSeriesDetails = z.infer<typeof MatchSeriesDetailsSchema>;
export type Ranking = z.infer<typeof RankingSchema>;
export type RankingsContent = z.infer<typeof RankingsSchemaContent>;
type RankingsResponse = z.infer<typeof RankingsResponseSchema>;

// query function
type RankingsProps = SamsQuery & ({ matchSeriesId: string | number; allSeasonMatchSeriesId?: never } | { allSeasonMatchSeriesId: string; matchSeriesId?: never });
export async function rankings(props: RankingsProps): Promise<RankingsContent> {
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
		const validatedJson: RankingsContent = RankingsResponseSchema.parse(json).rankings;

		// return rankings array
		return validatedJson;
	} catch (error) {
		console.error("Error fetching rankings:", error);
		throw error;
	}
}
