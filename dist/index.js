// src/enums.ts
var SamsServers;
((SamsServers2) => {
  SamsServers2["VOLLEYBALL_BUNDESLIGA"] = "https://www.volleyball-bundesliga.de/";
  SamsServers2["DVV_LEAGUES"] = "https://www.dvv-ligen.de/";
  SamsServers2["REGIONALLIGA_SUED"] = "https://www.volleyball-baden.de/";
  SamsServers2["REGIONALLIGA_NORD"] = "https://www.shvv.de/";
  SamsServers2["REGIONALLIGA_NORDWEST"] = "https://www.nwvv.de/";
  SamsServers2["SCHLESWIG_HOLSTEIN"] = "https://www.shvv.de/";
  SamsServers2["RHEINLAND_PFALZ"] = "https://www.vvrp.de/";
  SamsServers2["BADEN"] = "https://www.volleyball-baden.de/";
  SamsServers2["SACHSEN"] = "https://www.ssvb.org/";
  SamsServers2["NIEDERSACHSEN_BREMEN"] = "https://www.nwvv.de/";
  SamsServers2["THUERINGEN"] = "https://www.tv-v.de/";
  SamsServers2["WUERTTEMBERG"] = "https://vlw-online.de/";
  SamsServers2["HESSEN"] = "https://hessen-volley.de/";
  SamsServers2["SAARLAND"] = "https://svv.sams-server.de/";
  SamsServers2["BERLIN"] = "https://vvb.sams-server.de/";
  SamsServers2["SACHSEN_ANHALT"] = "https://vvsa.sams-server.de/";
  SamsServers2["NORDRHEIN_WESTFALEN"] = "https://wvv.sams-server.de/";
  SamsServers2["LUXEMBOURG"] = "https://flvb.sams-server.de/";
})(SamsServers ||= {});
// src/sams/match-series.ts
function matchSeries({ apiKey, server }) {
  return console.log(apiKey, server);
}
matchSeries({ apiKey: "hello", server: "https://www.volleyball-bundesliga.de/" /* VOLLEYBALL_BUNDESLIGA */ });
// src/index.ts
console.log("Hello, world!");
export {
  matchSeries,
  SamsServers
};
