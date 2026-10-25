const formatADX = (priceData, period) => {
  let output = [];
  for (let i = 0; i < priceData.length; i++) {
    if (i < period + 1) {
      output.push({ abs: 0, ADX: 50 });
      continue;
    }

    const prevDM = [];

    for (let j = i - period; j < i; j++) {
      const up = priceData[j].high - priceData[j - 1].high;
      const down = priceData[j].low - priceData[j - 1].low;

      let plusDM = up > down && up > 0 ? up : 0;
      let minusDM = down > up && down > 0 ? down : 0;

      if (!plusDM && !minusDM) {
        plusDM = 0.1;
      }

      const a = priceData[j].high - priceData[j - 1].low;
      const b = Math.abs(priceData[j].high - priceData[j - 1].close);
      const c = Math.abs(priceData[j].low - priceData[j - 1].close);

      const tr = Math.max(a, b, c);

      prevDM.push([plusDM, minusDM, tr]);
    }

    const trMean = prevDM.reduce((a, b) => a + b[2], 0) / period;

    const smaPlus = (prevDM.reduce((a, b) => a + b[0], 0) / period) * 100;
    const plusDI = smaPlus / trMean;

    const smaMinus = (prevDM.reduce((a, b) => a + b[1], 0) / period) * 100;
    const minusDI = smaMinus / trMean;

    if (i < period * 2 + 1) {
      output.push({
        abs: Math.abs((plusDI - minusDI) / (plusDI + minusDI)),
        ADX: 50,
      });
      continue;
    }

    if (i === period * 2 + 1) {
      const avgAbsDI =
        output
          .slice(i - period, i + 1)
          .map((el) => el.abs)
          .reduce((a, b) => a + b, 0) / period;
      const ADX = 100 * avgAbsDI;

      output.push({
        abs: Math.abs((plusDI - minusDI) / (plusDI + minusDI)),
        ADX,
      });
    }

    const avgAbsDI =
      (output[i - 1].abs * (period - 1) + output[i].abs) / period;
    const ADX = 100 * avgAbsDI;

    output.push({
      abs: Math.abs((plusDI - minusDI) / (plusDI + minusDI)),
      ADX,
    });
  }

  return output.map((el, i) => [i, el.ADX]);
};

export default formatADX;
