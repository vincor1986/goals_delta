const RSI = (history) => {
  let gains = 0;
  let losses = 0;
  let gainsCount = 0;
  let lossesCount = 0;

  for (let i = 1; i < history.length; i++) {
    let current = history[i];
    let prev = history[i - 1];

    if (current.close > prev.close) {
      gains += parseInt(current.close) - parseInt(prev.close);
      gainsCount++;
    } else if (current.close < prev.close) {
      losses += parseInt(prev.close) - parseInt(current.close);
      lossesCount++;
    }
  }

  const RSU = gains / gainsCount;
  const RSD = losses / lossesCount;

  if (!RSU) return 0;
  if (!RSD) return 100;

  const RS = RSU / RSD;
  const RSI = 100 - 100 / (1 + RS);

  return RSI;
};

module.exports = RSI;
