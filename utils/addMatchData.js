const fs = require("fs");
const path = require("path");

const EMA = require("../indicators/ema");

const JSON_DATA = require("../data/GD_CHART_DATA_3.json");
const RSI = require("@/indicators/rsi");

const addMatchData = (matchData) => {
  const { homeTeam, awayTeam, league, homeGD, homeHigh, homeLow } = matchData;

  const homeTeamExists = JSON_DATA[homeTeam] || false;
  const awayTeamExists = JSON_DATA[awayTeam] || false;

  let homeTick = false;
  let awayTick = false;

  if (homeTeamExists) {
    const lastMatch = JSON_DATA[homeTeam][JSON_DATA[homeTeam].length - 1];
    const delta = parseInt(lastMatch.close);
    const currentIndex = JSON_DATA[homeTeam].length;
    const newClose = delta + parseInt(homeGD);

    homeTick = {
      open: delta,
      high: delta + parseInt(homeHigh),
      low: delta + parseInt(homeLow),
      close: newClose,
      diff: Math.abs(parseInt(homeGD)),
      home: true,
      opponent: awayTeam,
      league,
      ema12: currentIndex < 12 ? 1000 : EMA(newClose, lastMatch.ema12, 12),
      ema26: currentIndex < 26 ? 1000 : EMA(newClose, lastMatch.ema26, 26),
      rsi: currentIndex < 14 ? 50 : RSI(JSON_DATA[homeTeam].slice(-15)),
    };

    homeTick.macd = currentIndex < 26 ? 0 : homeTick.ema12 - homeTick.ema26;
    homeTick.signal =
      currentIndex < 35 ? 0 : EMA(homeTick.macd, lastMatch.signal, 9);
    homeTick.histogram = homeTick.macd - homeTick.signal;
  }

  if (awayTeamExists) {
    const lastMatch = JSON_DATA[awayTeam][JSON_DATA[awayTeam].length - 1];
    const delta = parseInt(lastMatch.close);
    const currentIndex = JSON_DATA[awayTeam].length;
    const newClose = delta + parseInt(-homeGD);

    awayTick = {
      open: delta,
      high: delta + parseInt(-homeLow),
      low: delta + parseInt(-homeHigh),
      close: newClose,
      diff: Math.abs(parseInt(homeGD)),
      home: false,
      opponent: homeTeam,
      league,
      ema12: currentIndex < 12 ? 1000 : EMA(newClose, lastMatch.ema12, 12),
      ema26: currentIndex < 26 ? 1000 : EMA(newClose, lastMatch.ema26, 26),
      rsi: currentIndex < 14 ? 50 : RSI(JSON_DATA[awayTeam].slice(-15)),
    };

    awayTick.macd = currentIndex < 26 ? 0 : awayTick.ema12 - awayTick.ema26;
    awayTick.signal =
      currentIndex < 35 ? 0 : EMA(awayTick.macd, lastMatch.signal, 9);
    awayTick.histogram = awayTick.macd - awayTick.signal;
  }

  let dataCopy = { ...JSON_DATA };
  homeTeamExists && dataCopy[homeTeam].push(homeTick);
  awayTeamExists && dataCopy[awayTeam].push(awayTick);

  try {
    fs.writeFileSync(
      process.env.MASTERFILE_PATH,
      JSON.stringify(dataCopy, null, 2)
    );
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = addMatchData;
