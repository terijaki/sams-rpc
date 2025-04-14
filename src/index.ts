export * from "./enums";
export type { MatchSeries as SamsMatchSeries } from "./sams/match-series";
export type { Matches as SamsMatches } from "./sams/matches";
export type { Ranking as SamsRanking, RankingsContent as SamsRankingContent } from "./sams/rankings";
export type { Season as SamsSeason } from "./sams/seasons";
export type { Sportsclub as SamsSportsclub } from "./sams/sportsclub";
export type { SportsClubArray as SamsSportsClubArray } from "./sams/sportsclub-list";
export type { Team as SamsTeam } from "./sams/teams";
import { matchSeries } from "./sams/match-series";
import { matches } from "./sams/matches";
import { rankings } from "./sams/rankings";
import { seasons } from "./sams/seasons";
import { sportsclub } from "./sams/sportsclub";
import { sportsclubList } from "./sams/sportsclub-list";
import { teams } from "./sams/teams";

const sams = { matchSeries, matches, seasons, teams, rankings, sportsclubList, sportsclub };

export default sams;
