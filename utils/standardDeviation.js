const standardDeviation = (arr) => {
  const n = arr.length;
  const mean = arr.reduce((a, b) => a + b) / n;
  const variance = arr.reduce((a, b) => a + (b - mean) ** 2, 0) / n;
  return Math.sqrt(variance);
};

export default standardDeviation;
