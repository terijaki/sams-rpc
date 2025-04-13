import { z } from "zod";

// Season schema
export const SeasonSchema = z.object({
	id: z.number(),
	uuid: z.string(),
	name: z.string(),
});

// MatchSeries schema
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
	hierarchy: z.unknown(), // Keep as unknown until structure is known
});

// MatchSeriesList schema
export const MatchSeriesListSchema = z.object({
	matchSeries: z.array(MatchSeriesSchema),
});

// Root response schema
export const MatchSeriesResponseSchema = z.object({
	// "?xml": z.string(),
	matchSeriesList: MatchSeriesListSchema,
});

// Types derived from schemas
export type Season = z.infer<typeof SeasonSchema>;
export type MatchSeries = z.infer<typeof MatchSeriesSchema>;
export type MatchSeriesList = z.infer<typeof MatchSeriesListSchema>;
export type MatchSeriesResponse = z.infer<typeof MatchSeriesResponseSchema>;
