import { XMLParser } from "fast-xml-parser";
export const xmlParser = new XMLParser({
	allowBooleanAttributes: true,
	trimValues: true,
	ignoreAttributes: false,
	ignoreDeclaration: true,
	ignorePiTags: true,
	isArray: (name, path) => {
		// Define paths that should always be arrays
		const arrayPaths = ["teams.team", "matches.match","matches.match.referees.referee", "rankings.ranking", "rankings.ranking.resultTypes", "sportsclub.teams.team"];
		return arrayPaths.includes(path);
	},
});
