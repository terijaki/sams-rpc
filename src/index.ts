export * from "./enums";
export type { MatchSeries as SamsMatchSeries } from "./sams/match-series";
export type { Match as SamsMatch } from "./sams/matches";
export type { Ranking as SamsRanking, Rankings as SamsRankings } from "./sams/rankings";
export type { Season as SamsSeason } from "./sams/seasons";
export type { Sportsclub as SamsSportsclub } from "./sams/sportsclub";
export type { SimpleSportsClub as SamsSimpleSportsClub } from "./sams/sportsclub-list";
export type { Team as SamsTeam } from "./sams/teams";
export * from "./schemas";
import { matchSeries } from "./sams/match-series";
import { matches } from "./sams/matches";
import { rankings } from "./sams/rankings";
import { seasons } from "./sams/seasons";
import { sportsclub } from "./sams/sportsclub";
import { sportsclubList } from "./sams/sportsclub-list";
import { teams } from "./sams/teams";

export const sams = { matchSeries, matches, seasons, teams, rankings, sportsclubList, sportsclub };
