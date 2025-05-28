import { z } from "zod";

// primitive types
export const SamsIdSchema = z.union([z.string(), z.number()]).transform((val) => String(val));
const ShortNameSchema = z
	.union([z.string(), z.number()])
	.transform((val) => String(val))
	.optional()
	.nullable();
const NumberOrNullSchema = z.any().transform((val) => {
	if (Number.isNaN(Number(val))) return null;
	return Number(val);
});
const StringOrNullSchema = z.any().transform((val) => {
	if (!val) return null;
	return String(val);
});
const UrlSchema = z
	.string()
	.transform((val) => {
		if (!val || val === "") return null;
		try {
			new URL(val);
			return val;
		} catch {
			return null;
		}
	})
	.optional()
	.nullable();
const ClubNameSchema = z
	.union([
		z.any(),
		z.object({
			name: StringOrNullSchema.optional(),
			shortName: ShortNameSchema,
		}),
	])
	.transform((val) => {
		if (!val) return null;
		if (val.name) return String(val.name);
		return String(val);
	});

type ClubName = z.infer<typeof ClubNameSchema>;

// object schemas
export const LogoSchema = z.object({
	url: UrlSchema,
	filename: StringOrNullSchema.optional(),
	createDate: z.string().optional().nullable(),
});

export const HierarchySchema = z.object({
	id: SamsIdSchema,
	name: z.string(),
	shortName: ShortNameSchema,
	hierarchyLevel: z.number({ coerce: true }),
});

export const FullHierarchySchema = z.object({
	hierarchy: z.array(HierarchySchema),
});

export const SeasonSchema = z.object({
	id: SamsIdSchema,
	uuid: SamsIdSchema,
	name: z.string(),
});

export const AssociationSchema = z.object({
	name: StringOrNullSchema.optional(),
	shortName: ShortNameSchema,
});

export const AddressSchema = z.object({
	postbox: StringOrNullSchema.optional(),
	street: StringOrNullSchema.optional(),
	extraField: StringOrNullSchema.optional(),
	postcode: z.union([z.string(), z.number({ coerce: true })]).nullable(),
	city: StringOrNullSchema.optional(),
	region: StringOrNullSchema.optional(),
	country: StringOrNullSchema.optional(),
});

export const SimpleLocationSchema = z.object({
	id: SamsIdSchema.optional().nullable(),
	name: z.string().nullable(),
	address: AddressSchema.nullable(),
	homepage: z.string().nullable(),
});

export const LocationSchema = z.object({
	id: SamsIdSchema.optional().nullable(),
	name: z.string().nullable(),
	street: z.string().nullable(),
	extraField: z.string().nullable(),
	postalCode: NumberOrNullSchema,
	city: z.string(),
	note: z.string().nullable(),
});

export const MatchSeriesSchema = z.object({
	id: SamsIdSchema,
	uuid: SamsIdSchema,
	allSeasonId: SamsIdSchema,
	name: z.string(),
	shortName: ShortNameSchema,
	type: z.string(),
	updated: StringOrNullSchema.optional(),
	structureUpdated: StringOrNullSchema.optional(),
	resultsUpdated: StringOrNullSchema.optional(),
	season: SeasonSchema,
	hierarchy: HierarchySchema,
	fullHierarchy: FullHierarchySchema,
	association: AssociationSchema,
});
export const ClubSchema = z.object({
	name: StringOrNullSchema.optional(),
	id: SamsIdSchema,
	shortName: ShortNameSchema,
	logo: LogoSchema.optional().nullable(),
	www: UrlSchema,
	wwwDepartment: StringOrNullSchema.optional(),
});
export const TeamSchema = z.object({
	id: SamsIdSchema,
	uuid: SamsIdSchema,
	seasonTeamId: SamsIdSchema.optional().nullable(),
	placeCipher: z.number({ coerce: true }).nullable(),
	name: z.string(),
	shortName: ShortNameSchema,
	clubCode: StringOrNullSchema.optional(),
	status: z.string(),
	www: UrlSchema,
	logo: LogoSchema.optional().nullable(),
	club: ClubNameSchema,
	matchSeries: MatchSeriesSchema,
});

export const SimpleTeamSchema = z.object({
	id: SamsIdSchema,
	uuid: SamsIdSchema,
	name: z.string(),
	shortName: ShortNameSchema,
	clubCode: StringOrNullSchema.optional(),
	club: ClubNameSchema,
});

export const MatchOperationCompanySchema = z.object({
	id: SamsIdSchema.nullable(),
	name: StringOrNullSchema.optional(),
	address: AddressSchema,
	homepage: UrlSchema,
});

export const SportsclubSchema = z.object({
	id: SamsIdSchema,
	name: z.string(),
	logo: LogoSchema.nullable(),
	lsbNumber: SamsIdSchema.optional().nullable(),
	internalSportsclubId: SamsIdSchema.optional().nullable(),
	association: AssociationSchema.optional(),
	matchOperationCompany: MatchOperationCompanySchema,
	teams: z.object({ team: z.array(TeamSchema) }).nullable(),
	locations: z.object({ main: SimpleLocationSchema.optional().nullable() }).optional().nullable(),
});

export const SimpleSportsclubSchema = z.object({
	id: SamsIdSchema,
	name: z.string(),
	lsbNumber: SamsIdSchema.optional().nullable(),
	internalSportsclubId: SamsIdSchema.optional().nullable(),
	association: z
		.object({
			id: SamsIdSchema.optional().nullable(),
			name: StringOrNullSchema.optional(),
		})
		.optional(),
});

export const RankingSchema = z.object({
	team: SimpleTeamSchema,
	place: NumberOrNullSchema.optional(),
	matchesPlayed: NumberOrNullSchema.optional(),
	wins: NumberOrNullSchema.optional(),
	losses: NumberOrNullSchema.optional(),
	points: NumberOrNullSchema.optional(),
	setPoints: StringOrNullSchema.optional(),
	setWinScore: NumberOrNullSchema.optional(),
	setLoseScore: NumberOrNullSchema.optional(),
	setPointDifference: NumberOrNullSchema.optional(),
	setQuotient: StringOrNullSchema.optional(),
	ballPoints: StringOrNullSchema.optional(),
	ballWinScore: NumberOrNullSchema.optional(),
	ballLoseScore: NumberOrNullSchema.optional(),
	ballPointDifference: NumberOrNullSchema.optional(),
	ballQuotient: StringOrNullSchema.optional(),
	resultTypes: z
		.array(
			z.object({
				result: z
					.string()
					.regex(/^(\d+):(\d+)$/)
					.optional()
					.nullable(),
				count: NumberOrNullSchema.optional(),
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
	id: SamsIdSchema,
	uuid: SamsIdSchema,
	name: z.string(),
	club: StringOrNullSchema.optional(),
});

export const ResultsSchema = z.object({
	winner: NumberOrNullSchema,
	setPoints: z.string(),
	ballPoints: z.string(),
	sets: z.any().optional().nullable(),
	verified: z.boolean().optional().nullable(),
});

export const MatchSchema = z.object({
	id: SamsIdSchema,
	uuid: SamsIdSchema,
	number: NumberOrNullSchema,
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
	results: ResultsSchema.optional().nullable(),
	spectators: NumberOrNullSchema.optional(),
	netDuration: NumberOrNullSchema.optional(),
});
