import { z } from "zod";

export const LogoSchema = z.object({
	url: z.string(),
	filename: z.string().optional(),
	createDate: z.string().optional(),
});

export const HierarchySchema = z.object({
	id: z.number(),
	name: z.string(),
	shortName: z.string().optional(),
	hierarchyLevel: z.number(),
});

export const FullHierarchySchema = z.object({
	hierarchy: z.array(HierarchySchema),
});

export const SeasonSchema = z.object({
	id: z.number(),
	uuid: z.string(),
	name: z.string(),
});

export const AssociationSchema = z.object({
	name: z.string(),
	shortName: z.string().optional(),
});

export const AddressSchema = z.object({
	postbox: z.string().optional(),
	street: z.string().optional(),
	extraField: z.string().optional(),
	postcode: z.union([z.string(), z.number()]).optional(),
	city: z.string().optional(),
	region: z.string().optional(),
	country: z.string().optional(),
});

export const SimpleLocationSchema = z.object({
	id: z.union([z.number(), z.string()]),
	name: z.string(),
	address: AddressSchema.optional(),
	homepage: z.string().optional(),
});

export const LocationSchema = z.object({
	id: z.number(),
	name: z.string().optional(),
	street: z.string().optional(),
	extraField: z.string().optional(),
	postalCode: z.union([z.number(), z.string()]),
	city: z.string(),
	note: z.string().optional(),
});

export const MatchSeriesSchema = z.object({
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
	hierarchy: HierarchySchema,
	fullHierarchy: FullHierarchySchema,
	association: AssociationSchema,
});
export const ClubSchema = z.object({
	name: z.string(),
	id: z.number(),
	shortName: z.string(),
	logo: LogoSchema.optional(),
	www: z.string().optional(),
	wwwDepartment: z.string().optional(),
});
export const TeamSchema = z.object({
	id: z.number(),
	uuid: z.string(),
	seasonTeamId: z.number(),
	placeCipher: z.number(),
	name: z.string(),
	shortName: z.string().optional(),
	clubCode: z.string(),
	status: z.string(),
	www: z.string().optional(),
	logo: LogoSchema.optional(),
	club: z.object({
		name: z.string(),
		shortName: z.string().optional(),
	}),
	matchSeries: MatchSeriesSchema,
});

export const SimpleTeamSchema = z.object({
	id: z.number(),
	uuid: z.string(),
	name: z.string(),
	shortName: z.string(),
	clubCode: z.string(),
	club: z.object({
		name: z.string().optional(),
		shortName: z.string().optional(),
	}),
});

export const MatchOperationCompanySchema = z.object({
	id: z.string(),
	name: z.string(),
	address: AddressSchema,
	homepage: z.string(),
});

export const SportsclubSchema = z.object({
	id: z.number(),
	name: z.string(),
	logo: LogoSchema,
	lsbNumber: z.union([z.string(), z.number()]).optional(),
	internalSportsclubId: z.union([z.string(), z.number()]).optional(),
	association: AssociationSchema.optional(),
	matchOperationCompany: MatchOperationCompanySchema,
	teams: z.union([
		z.object({
			team: z.array(TeamSchema),
		}),
		z.string().optional(),
	]),
	locations: z
		.object({
			main: SimpleLocationSchema.optional(),
		})
		.optional(),
});

export const SimpleSportsclubSchema = z.object({
	id: z.number(),
	name: z.string(),
	lsbNumber: z.union([z.string(), z.number()]).optional(),
	internalSportsclubId: z.union([z.string(), z.number()]).optional(),
	association: z
		.object({
			id: z.union([z.string(), z.number()]).optional(),
			name: z.string().optional(),
		})
		.optional(),
});

export const RankingSchema = z.object({
	team: SimpleTeamSchema,
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
	resultTypes: z.array(
		z.object({
			result: z.string().regex(/^(\d+):(\d+)$/),
			count: z.number(),
		})
	),
});

export const RankingsSchemaContent = z.object({
	matchSeries: MatchSeriesSchema,
	ranking: z.array(RankingSchema),
});

export const HostSchema = z.object({
	id: z.number(),
	uuid: z.string(),
	name: z.string(),
	club: z.string(),
});

export const ResultsSchema = z.object({
	winner: z.number(),
	setPoints: z.string(),
	ballPoints: z.string(),
	sets: z.object({}).optional(),
	verified: z.boolean(),
});

export const MatchSchema = z.object({
	id: z.number(),
	uuid: z.string(),
	number: z.number(),
	date: z.string(),
	time: z.string(),
	delayPossible: z.boolean(),
	decidingMatch: z.boolean(),
	indefinitelyRescheduled: z.boolean(),
	gameReassessed: z.boolean(),
	host: HostSchema,
	team: z.array(SimpleTeamSchema),
	matchSeries: MatchSeriesSchema,
	location: LocationSchema,
	referees: z.object({
		referee: z.array(z.object({})).optional(),
	}),
	results: ResultsSchema,
	spectators: z.number(),
	netDuration: z.number(),
});
