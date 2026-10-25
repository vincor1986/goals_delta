// access ALL_MATCHES.json file and reduce its size by keeping only entries where one of the home or away team feature in TEAMS.json

const fs = require("fs");
const allMatches = JSON.parse(
  fs.readFileSync("./data/ALL_MATCHES.json", "utf-8"),
);
const allTeams = JSON.parse(fs.readFileSync("./data/TEAMS.json", "utf-8"));

const reducedMatches = allMatches.filter(
  (match) =>
    allTeams.includes(match.home_team_name) ||
    allTeams.includes(match.away_team_name),
);

fs.writeFileSync(
  "./data/REDUCED_MATCHES.json",
  JSON.stringify(reducedMatches, null, 2),
);
