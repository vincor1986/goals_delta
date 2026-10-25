const data = require("../data/GD_CHART_DATA.json");

const ARSENAL = data.Arsenal;
const len = ARSENAL.length - 1;

const STEPS = [0, 1, 2, 3, 4];

const bp = (arr) => {
  let totals = {
    ghh: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    gll: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    rhh: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    rll: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
  };

  let values = JSON.parse(JSON.stringify(totals));

  const score = (index, stepIndex) => {
    let greenCandleCount = arr.filter((tick) => tick.close > tick.open).length;
    let redCandleCount = arr.filter((tick) => tick.close < tick.open).length;

    const green = arr[index].close > arr[index].open;
    const red = arr[index].close < arr[index].open;

    const hh = arr[index].high >= arr[index - 1].high + STEPS[stepIndex];
    const ll = arr[index].low <= arr[index - 1].low - STEPS[stepIndex];

    if (green && hh) {
      const newTotal = totals.ghh[STEPS[stepIndex]] + 1;
      totals.ghh[STEPS[stepIndex]] = newTotal;
      values.ghh[STEPS[stepIndex]] = parseFloat(
        ((newTotal / greenCandleCount) * 100).toFixed(2)
      );
    }
    if (green && ll) {
      const newTotal = totals.gll[STEPS[stepIndex]] + 1;
      totals.gll[STEPS[stepIndex]] = newTotal;
      values.gll[STEPS[stepIndex]] = parseFloat(
        ((newTotal / greenCandleCount) * 100).toFixed(2)
      );
    }
    if (red && hh) {
      const newTotal = totals.rhh[STEPS[stepIndex]] + 1;
      totals.rhh[STEPS[stepIndex]] = newTotal;
      values.rhh[STEPS[stepIndex]] = parseFloat(
        ((newTotal / redCandleCount) * 100).toFixed(2)
      );
    }
    if (red && ll) {
      const newTotal = totals.rll[STEPS[stepIndex]] + 1;
      totals.rll[STEPS[stepIndex]] = newTotal;
      values.rll[STEPS[stepIndex]] = parseFloat(
        ((newTotal / redCandleCount) * 100).toFixed(2)
      );
    }
  };

  for (let indx = 100; indx < len; indx++) {
    for (let i = 0; i < 5; i++) {
      score(indx, i);
    }
  }

  console.log(values);
};

bp(ARSENAL);

// export default bp;
