import { z } from "zod";
import { SamsServers } from "../enums";

const ServerSchema = z.string().url();

/** This function verifies the API key and server URL for the SAMS API. */
export function verifyCredentials(rawApiKey?: string, rawserverUrl?: SamsServers|string) {
	// validate API-Key
	const apiKeyOrEnv = rawApiKey || process.env.SAMS_API_KEY;
	if (!apiKeyOrEnv) throw new Error("API key is required! Include key as function prop or set the env SAMS_API_KEY");

	// validate Server URL
	const serverOrEnv = rawserverUrl || process.env.SAMS_SERVER;
	const validateServer = ServerSchema.safeParse(serverOrEnv?.trim());
	if (!validateServer.success) throw new Error("Sams server required! Include server as function prop or set the env SAMS_SERVER");

	// remove training slash if present
	const sanitizedServerUrl = validateServer.data.endsWith("/") ? validateServer.data.slice(0, -1) : validateServer.data;

	// return the verified API key and server URL
	return {
		apiKey: apiKeyOrEnv,
		serverUrl: sanitizedServerUrl,
	};
}
