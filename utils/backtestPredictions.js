const DATA = require("../data/GD_CHART_DATA.json");
const MATCHES = DATA["Leicester City"];

const serialize = (arr, length, startingIndex) => {
  const slice = arr.slice(startingIndex, startingIndex + length);
  const formatted = slice.map((el) => ({
    // high: el.high - el.open,
    // low: el.low - el.open,
    close: el.close - el.open,
  }));

  return JSON.stringify(formatted);
};

const START = 100;
const LOOKBACK_LENGTH = 3;

let correct = 0;
let incorrect = 0;
let total = 0;

for (let i = START; i < MATCHES.length; i++) {
  const current = MATCHES[i];

  let history = [];

  for (let j = LOOKBACK_LENGTH; j < i; j++) {
    const serialized = serialize(MATCHES, LOOKBACK_LENGTH, j - LOOKBACK_LENGTH);
    const result =
      MATCHES[j].close > MATCHES[j].open
        ? 0
        : MATCHES[j].close < MATCHES[j].open
        ? 2
        : 1;

    history.push({ serialized, result });
  }

  const currentSerialized = serialize(MATCHES, LOOKBACK_LENGTH, i);
  const currentResult =
    current.close > current.open ? 0 : current.close < current.open ? 2 : 1;

  let same = history.filter((el) => el.serialized === currentSerialized);

  let win, lose, draw;

  if (same.length) {
    win = same.filter((el) => el.result === 0).length;
    lose = same.filter((el) => el.result === 2).length;
    draw = same.filter((el) => el.result === 1).length;
  } else {
    continue;
  }

  total++;

  if (currentResult === 1) {
    correct++;
  } else if (
    [win, draw, lose].indexOf(Math.max(win, draw, lose)) === currentResult
  ) {
    correct++;
  } else {
    incorrect++;
  }
}

console.log("Correct:", correct, "/", total);
console.log("Incorrect:", incorrect, "/", total);
