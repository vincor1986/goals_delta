const formatMACDData = (data, index) => {
  return { macd: data.macd, signal: data.signal, histogram: data.histogram };
};

export default formatMACDData;
