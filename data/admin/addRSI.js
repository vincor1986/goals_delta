const fs = require("fs");
const path = require("path");

const DATA = require("../GD_CHART_DATA.json");
const TEAMS = require("../TEAMS.json");

const RSI = require("../../indicators/rsi");

const dataCopy = { ...DATA };

for (const team of TEAMS) {
  let teamData = [...dataCopy[team]];

  for (let i = 0; i < teamData.length; i++) {
    if (i <= 13) {
      teamData[i].rsi = 50;
    } else {
      const rsi = RSI(teamData.slice(i - 14, i + 1));
      teamData[i].rsi = rsi;
    }
  }

  dataCopy[team] = teamData;
}

fs.writeFileSync(
  path.join(__dirname, "../GD_CHART_DATA.json"),
  JSON.stringify(dataCopy, null, 2)
);
