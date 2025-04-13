import type { SamsServers } from "../enums";

export type SamsQuery = {
	apiKey?: string;
	serverUrl?: SamsServers;
};
