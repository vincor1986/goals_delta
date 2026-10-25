const fs = require("fs");
const path = require("path");

const EPL_MATCHES = require("../EPL_MATCHES.json");

const allTeams = Array.from(
  new Set(EPL_MATCHES.map((match) => match.home_team_name))
);

fs.writeFileSync(
  path.join(__dirname, "../", "TEAMS.json"),
  JSON.stringify(allTeams, null, 2)
);
