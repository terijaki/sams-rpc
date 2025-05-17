import { XMLParser } from "fast-xml-parser";
export const xmlParser = new XMLParser({
	allowBooleanAttributes: true,
	trimValues: true,
	ignoreAttributes: false,
	ignoreDeclaration: true,
	ignorePiTags: true,
	isArray: (name, path) => {
		// Define paths that should always be arrays
		const arrayPaths = ["teams.team", "matches.match", "rankings.ranking","rankings.ranking.team.club", "sportsclub.teams.team"];
		return arrayPaths.includes(path);
	},
});
