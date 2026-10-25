const fs = require("fs");
const path = require("path");

const DATA = require("../GD_CHART_DATA_2.json");

const isEqual = (value1, value2) => {
  if ([0, -0].includes(value1) && [0, -0].includes(value2)) return true;
  return parseInt(value1) === parseInt(value2);
};

const isSameMatch = (team, awayTick, homeTick) => {
  if (
    ![homeTick.opponent, "Other"].includes(team) ||
    awayTick.league !== homeTick.league
  )
    return false;

  const homeHigh = homeTick.high - homeTick.open;
  const homeLow = homeTick.low - homeTick.open;
  const homeGD = homeTick.close - homeTick.open;

  const awayHigh = awayTick.high - awayTick.open;
  const awayLow = awayTick.low - awayTick.open;
  const awayGD = awayTick.close - awayTick.open;

  return (
    isEqual(homeHigh, -awayLow) &&
    isEqual(homeLow, -awayHigh) &&
    isEqual(homeGD, -awayGD)
  );
};

const LOOKBACK = 5;

const dataCopy = { ...DATA };
const TEAMS = Object.keys(DATA);

const fixNameBug = (bugTeam, awayTick) => {
  let found = false;

  for (let i = 0; i < TEAMS.length; i++) {
    const team = TEAMS[i];
    if (team === bugTeam) continue;

    const matches = dataCopy[team].slice(-LOOKBACK);
    const results = matches.filter((homeTick) =>
      isSameMatch(bugTeam, awayTick, homeTick)
    );

    if (results.length > 0) {
      found = team;
      break;
    }
  }

  return found;
};

let fixCount = 0;

TEAMS.forEach((team) => {
  const teamData = [...dataCopy[team]];

  for (let i = teamData.length - LOOKBACK; i < teamData.length; i++) {
    if (teamData[i].opponent !== team) continue;

    const awayTick = teamData[i];
    let homeTeam = fixNameBug(team, awayTick);

    if (!homeTeam) {
      homeTeam == "Other";
    }

    dataCopy[team][i] = { ...teamData[i], opponent: homeTeam };
    fixCount++;
  }
});

console.log("fixed: ", fixCount);

fs.writeFileSync(
  path.join(__dirname, "../", "GD_CHART_DATA_3.json"),
  JSON.stringify(dataCopy, null, 2)
);

console.log("done");
