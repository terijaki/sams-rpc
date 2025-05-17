import { z } from "zod";

export const LogoSchema = z.object({
	url: z.string().nullable(),
	filename: z.string().optional().nullable(),
	createDate: z.string().optional().nullable(),
});

export const HierarchySchema = z.object({
	id: z.number({ coerce: true }),
	name: z.string(),
	shortName: z.string().optional().nullable(),
	hierarchyLevel: z.number({ coerce: true }),
});

export const FullHierarchySchema = z.object({
	hierarchy: z.array(HierarchySchema),
});

export const SeasonSchema = z.object({
	id: z.number({ coerce: true }),
	uuid: z.string(),
	name: z.string(),
});

export const AssociationSchema = z.object({
	name: z.string().nullable(),
	shortName: z.string().optional().nullable(),
});

export const AddressSchema = z.object({
	postbox: z.string().nullable(),
	street: z.string().nullable(),
	extraField: z.string().nullable(),
	postcode: z.union([z.string(), z.number({ coerce: true })]).nullable(),
	city: z.string().nullable(),
	region: z.string().nullable(),
	country: z.string().nullable(),
});

export const SimpleLocationSchema = z.object({
	id: z.union([z.number({ coerce: true }), z.string()]).nullable(),
	name: z.string().nullable(),
	address: AddressSchema.nullable(),
	homepage: z.string().nullable(),
});

export const LocationSchema = z.object({
	id: z.number({ coerce: true }),
	name: z.string().nullable(),
	street: z.string().nullable(),
	extraField: z.string().nullable(),
	postalCode: z.union([z.number({ coerce: true }), z.string()]),
	city: z.string(),
	note: z.string().nullable(),
});

export const MatchSeriesSchema = z.object({
	id: z.number({ coerce: true }),
	uuid: z.string(),
	allSeasonId: z.string(),
	name: z.string(),
	shortName: z.string().nullable(),
	type: z.string(),
	updated: z.string(),
	structureUpdated: z.string().nullable(),
	resultsUpdated: z.string().nullable(),
	season: SeasonSchema,
	hierarchy: HierarchySchema,
	fullHierarchy: FullHierarchySchema,
	association: AssociationSchema,
});
export const ClubSchema = z.object({
	name: z.string(),
	id: z.number({ coerce: true }),
	shortName: z.string().nullable(),
	logo: LogoSchema.optional().nullable(),
	www: z.string().optional().nullable(),
	wwwDepartment: z.string().optional().nullable(),
});
export const TeamSchema = z.object({
	id: z.number({ coerce: true }),
	uuid: z.string(),
	seasonTeamId: z.number({ coerce: true }).nullable(),
	placeCipher: z.number({ coerce: true }).nullable(),
	name: z.string(),
	shortName: z.string().optional().nullable(),
	clubCode: z.string().nullable(),
	status: z.string(),
	www: z.string().optional().nullable(),
	logo: LogoSchema.optional().nullable(),
	club: z.object({
		name: z.string(),
		shortName: z.string().optional().nullable(),
	}),
	matchSeries: MatchSeriesSchema,
});

export const SimpleTeamSchema = z.object({
	id: z.number({ coerce: true }),
	uuid: z.string(),
	name: z.string(),
	shortName: z.string().optional().nullable(),
	clubCode: z.string().optional().nullable(),
	club: z.object({
		name: z.string().optional(),
		shortName: z.string().optional().nullable(),
	}),
});

export const MatchOperationCompanySchema = z.object({
	id: z.string().nullable(),
	name: z.string().nullable(),
	address: AddressSchema,
	homepage: z.string().nullable(),
});

export const SportsclubSchema = z.object({
	id: z.number({ coerce: true }),
	name: z.string(),
	logo: LogoSchema.nullable(),
	lsbNumber: z
		.union([z.string(), z.number({ coerce: true })])
		.optional()
		.nullable(),
	internalSportsclubId: z
		.union([z.string(), z.number({ coerce: true })])
		.optional()
		.nullable(),
	association: AssociationSchema.optional(),
	matchOperationCompany: MatchOperationCompanySchema,
	teams: z.object({ team: z.array(TeamSchema) }).nullable(),
	locations: z
		.object({
			main: SimpleLocationSchema.optional().nullable(),
		})
		.optional()
		.nullable(),
});

export const SimpleSportsclubSchema = z.object({
	id: z.number({ coerce: true }),
	name: z.string(),
	lsbNumber: z
		.union([z.string(), z.number({ coerce: true })])
		.optional()
		.nullable(),
	internalSportsclubId: z.union([z.string(), z.number({ coerce: true })]).optional(),
	association: z
		.object({
			id: z.union([z.string(), z.number({ coerce: true })]).optional(),
			name: z.string().optional(),
		})
		.optional(),
});

export const RankingSchema = z.object({
	team: SimpleTeamSchema,
	place: z.number({ coerce: true }).optional().nullable(),
	matchesPlayed: z.number({ coerce: true }).optional().nullable(),
	wins: z.number({ coerce: true }).optional().nullable(),
	losses: z.number({ coerce: true }).optional().nullable(),
	points: z.number({ coerce: true }).optional().nullable(),
	setPoints: z.string().optional().nullable(),
	setWinScore: z.number({ coerce: true }).optional().nullable(),
	setLoseScore: z.number({ coerce: true }).optional().nullable(),
	setPointDifference: z.number({ coerce: true }).optional().nullable(),
	setQuotient: z.string().optional().nullable(),
	ballPoints: z.string().optional().nullable(),
	ballWinScore: z.number({ coerce: true }).optional().nullable(),
	ballLoseScore: z.number({ coerce: true }).optional().nullable(),
	ballPointDifference: z.number({ coerce: true }).optional().nullable(),
	ballQuotient: z.string().optional().nullable(),
	resultTypes: z
		.array(
			z.object({
				result: z
					.string()
					.regex(/^(\d+):(\d+)$/)
					.optional()
					.nullable(),
				count: z.number({ coerce: true }).optional().nullable(),
			}),
		)
		.optional()
		.nullable(),
});

export const RankingsSchemaContent = z.object({
	matchSeries: MatchSeriesSchema,
	ranking: z.array(RankingSchema).optional(),
});

export const HostSchema = z.object({
	id: z.number({ coerce: true }),
	uuid: z.string(),
	name: z.string(),
	club: z.string().nullable(),
});

export const ResultsSchema = z.object({
	winner: z.number({ coerce: true }),
	setPoints: z.string(),
	ballPoints: z.string(),
	sets: z.object({}).optional(),
	verified: z.boolean(),
});

export const MatchSchema = z.object({
	id: z.number({ coerce: true }),
	uuid: z.string(),
	number: z.number({ coerce: true }),
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
	referees: z.any().optional().nullable(),
	results: ResultsSchema,
	spectators: z
		.any()
		.optional()
		.nullable()
		.transform((val) => {
			if (val === undefined || val === null) return null;
			return Number.isNaN(Number(val)) ? null : Number(val);
		}),
	netDuration: z
		.any()
		.optional()
		.nullable()
		.transform((val) => {
			if (val === undefined || val === null) return null;
			return Number.isNaN(Number(val)) ? null : Number(val);
		}),
});
