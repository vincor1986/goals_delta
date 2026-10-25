const fs = require("fs");
const path = require("path");

const getHL = require("./getHL");
const getGD = require("./getGD");
const getVol = require("./getVol");

const EMA = require("../../indicators/ema");

const TEAMS = require("../TEAMS.json");
const MATCHES = require("../ALL_MATCHES.json");
const RSI = require("@/indicators/rsi");

let data = {};

TEAMS.forEach((team) => {
  data[team] = [];

  let delta = 1000;

  const teamMatches = MATCHES.filter(
    (match) => match.home_team_name === team || match.away_team_name === team
  );

  teamMatches.forEach((match, index) => {
    const gd = getGD(match, team);
    const [low, high] = getHL(match, team);
    let tick = {
      open: delta,
      high: delta + high,
      low: delta + low,
      close: delta + gd,
      diff: Math.abs(gd),
      home: match.home_team_name === team,
      opponent:
        match.home_team_name === team
          ? match.away_team_name
          : match.home_team_name,
      league: match.league,
      volume: getVol(match),
      time: parseInt(match.timestamp),
      ema12:
        index < 12 ? 1000 : EMA(delta + gd, data[team][index - 1].ema12, 12),
      ema26:
        index < 26 ? 1000 : EMA(delta + gd, data[team][index - 1].ema12, 26),
    };

    tick.macd = index < 26 ? 0 : tick.ema12 - tick.ema26;
    tick.signal =
      index < 35 ? 0 : EMA(tick.macd, data[team][index - 1].signal, 9);
    tick.histogram = tick.macd - tick.signal;
    tick.rsi = index < 14 ? 50 : RSI(data[team].slice(-15));

    delta += gd;
    data[team].push(tick);
  });
});

fs.writeFileSync(
  path.join(__dirname, "../", "GD_CHART_DATA.json"),
  JSON.stringify(data, null, 2)
);
