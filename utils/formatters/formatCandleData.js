const formatCandleData = (data, index) => {
  return [
    index,
    [data.open, data.high, data.low, data.close],
    { home: data.home, opponent: data.opponent, league: data.league },
  ];
};

export default formatCandleData;
