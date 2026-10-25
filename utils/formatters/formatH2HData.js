const EMA = require("../../indicators/ema");
const RSI = require("../../indicators/rsi");

const formatH2HData = (data) => {
  if (!data.length) return [];

  let outputData = [];

  let delta = 1000;

  data.forEach((match, index) => {
    const gd = match.close - match.open;
    const low = match.low - match.open;
    const high = match.high - match.open;
    let tick = {
      open: delta,
      high: delta + high,
      low: delta + low,
      close: delta + gd,
      diff: Math.abs(gd),
      home: match.home,
      opponent: match.opponent,
      league: match.league,
      volume: match.volume,
      time: parseInt(match.time),
      ema12:
        index < 12 ? 1000 : EMA(delta + gd, outputData[index - 1].ema12, 12),
      ema26:
        index < 26 ? 1000 : EMA(delta + gd, outputData[index - 1].ema12, 26),
    };

    tick.macd = index < 26 ? 0 : tick.ema12 - tick.ema26;
    tick.signal =
      index < 35 ? 0 : EMA(tick.macd, outputData[index - 1].signal, 9);
    tick.histogram = tick.macd - tick.signal;
    tick.rsi = index < 14 ? 50 : RSI(outputData.slice(-15));

    delta += gd;
    outputData.push(tick);
  });

  return outputData;
};

module.exports = formatH2HData;
