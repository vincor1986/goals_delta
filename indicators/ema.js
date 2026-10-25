const EMA = (close, prevEMA, period) => {
  const multiplier = 2 / (period + 1);
  return close * multiplier + prevEMA * (1 - multiplier);
};

module.exports = EMA;
