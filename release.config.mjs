/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
	branches: ["main", "next"],
	plugins: [
		"@semantic-release/commit-analyzer",
		"@semantic-release/release-notes-generator",
		"@semantic-release/npm", // Updates package.json version
		[
			"@semantic-release/git",
			{
				assets: ["package.json"],
				message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
			},
		],
		"@semantic-release/github",
	],
};
