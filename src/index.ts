export * from "./enums";
export type { MatchSeries } from "./sams/match-series";
export type { Match } from "./sams/matches";
export type { Ranking, Rankings } from "./sams/rankings";
export type { Season } from "./sams/seasons";
export type { Sportsclub } from "./sams/sportsclub";
export type { SimpleSportsClub } from "./sams/sportsclub-list";
export type { Team } from "./sams/teams";
export * from "./schemas";
import { matchSeries } from "./sams/match-series";
import { matches } from "./sams/matches";
import { rankings } from "./sams/rankings";
import { seasons } from "./sams/seasons";
import { sportsclub } from "./sams/sportsclub";
import { sportsclubList } from "./sams/sportsclub-list";
import { teams } from "./sams/teams";

export const sams = { matchSeries, matches, seasons, teams, rankings, sportsclubList, sportsclub };
