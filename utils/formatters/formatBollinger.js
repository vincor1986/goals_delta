import standardDeviation from "../standardDeviation";

export const formatBollingerBandsUpper = (val, index, arr) => {
  const sma =
    index < 20
      ? val
      : arr.slice(index - 20, index).reduce((acc, el) => acc + el, 0) / 20;
  return [
    index,
    index < 20
      ? sma
      : sma + standardDeviation(arr.slice(index - 20, index)) * 2,
  ];
};

export const formatBollingerBandsLower = (val, index, arr) => {
  const sma =
    index < 20
      ? val
      : arr.slice(index - 20, index).reduce((acc, el) => acc + el, 0) / 20;

  return [
    index,
    index < 20
      ? sma
      : sma - standardDeviation(arr.slice(index - 20, index)) * 2,
  ];
};
