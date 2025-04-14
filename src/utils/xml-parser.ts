import { XMLParser } from "fast-xml-parser";
export const xmlParser = new XMLParser({
	allowBooleanAttributes: true,
	trimValues: true,
	ignoreAttributes: false,
	ignoreDeclaration: true,
	ignorePiTags: true,
});
