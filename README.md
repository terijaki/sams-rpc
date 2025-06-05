> **⚠️ DEPRECATED**: This package is no longer maintained. SAMS depreacted their XML API in favor of a new [REST API](https://wiki.sams-server.de/wiki/REST-API-Schnittstelle). The new API comes with a swagger.json. I recommend you check out [Hey API](https://heyapi.dev) which can generate a Typesafe SDK for you based on the remote JSON.

# SAMS RPC

This package adds quality of live improvements when working with the SAMS-Server of the German Volleyball Association.
http://wiki.sams-server.de/wiki/XML-Schnittstelle

The SAMS server only offers XML responses, no JSON. It currently also lacks documentation of the response structure.

This package fixes both aspects. It makes the fetch call to the server, parses the XML into **JSON**, validates the data and then returns the data to you. It comes with **TypeScript definitions** and **[Zod schemas](https://zod.dev)** for you to use across your app.

`fetch > parse > validate > return`

## Pre-Requisites

- You need to bring your own `API key`.

_See the SAMS-Wiki for your point of contacts and review the rate limits associated with your key._

## Installation

Install the package using your favorite package manager. e.g.:

```zsh
npm install sams-rpc
bun install sams-rpc
```

## (Optional) Environmental Variables/Secrets

Add your API key and SAMS Server as environmental variables. This step is optional and allows you to omit the parameters from the funcitons.

```dotenv
SAMS_API_KEY=YourApiKey
SAMS_SERVER=https://www.volleyball-baden.de
```

If you are not setting the **environmental variables** or cannot read them, you must add the values to the parameter.

```typescript
// with .env
sams.sportsclubList();

// without .env
sams.sportsclubList({
  apiKey: "YourApiKey",
  serverUrl: "https://www.volleyball-baden.de",
});
```

## Example

"As a club member, I want to locate my club and retrieve all of our teams."

```typescript
// import the module
import { sams } from "sams-rpc";

// make a call to get all clubs
const clubs = await sams.sportsclubList();

// now you can locate your own club …
const filteredClub = clubs.filter((club) => club.name == "VC Müllheim");

// … and extract data such as name and id
const name = myClub.name; // "VC Müllheim"
const id = myClub.id; // 65036648
```

Now that we have the club ID, we can use it to get more information.

```typescript
// retrieved the full club data including its teams
const ourClub = await sams.sportsclub({ sportsclubId: 65036648 });

// use the team array
const ourTeams = ourClub.teams;
```

Knowing the match series ID and the team ID, we can use it in further calls. For example to get the team's ranking or upcoming scheduled matches.

See [example responses](https://github.com/terijaki/sams-rpc/tree/main/examples)

## APIs

### Sportsclub List

This list contains all clubs stored in the database. For each club only basic data is included such as name, id and association.

### Sportsclub

Using the **club ID** (optained from Sportsclub List), this api provides all data about the club, such as locations, logo, homepage and all teams and their data (e.g. team ID).

### Seasons

Returns a list of all available seasons. The season ID can be used for Match Series overview to access historical data.

### Match Series

Displays all available leagues and competitions with their IDs (matchSeriesId). Match series IDs are season-specific, while allSeasonMatchSeriesId (available since 2016) works across seasons and always returns current season data. The UUIDs are unique across all SAMS databases.

**Note**: This is the only api which doesn't have a rate limit! ☝️

Parameters **structureUpdated** and **resultsUpdated** indicate when changes were made to structure (schedule, dates) or results.

### Rankings

Get the rankings of a particular Match Series. It includes the place, wins & losses, points, etc.

### Teams

This gets all teams of a particular Match Series. The team object is identical to the team object you get from the sportsclub.

### Matches

This api allows you to fetch specific matches. Key filters are **Match Series** or **Team**.

- **matchSeriesId** // **allSeasonMatchSeriesId**
- **teamId**

More optional parameters:

- **before** - Date in the format dd.mm.yyyy or yyyy-mm-dd, specifying games before this date (e.g., before=31.01.2012)
- **after** - Date in the format dd.mm.yyyy or yyyy-mm-dd, specifying games after this date. Default is the season start (e.g., after=2011-12-01)
- **past** - Overrides the `before` parameter and shows all past games if the parameter is set to "true" (e.g., past=true)
- **future**=true - Use this parameter to display future games. In combination with the parameter `limit=`, you can limit the number of results (e.g., future=true&limit=3, shows the next 3 games).
