import RSIChart from "react-apexcharts";

const CHART_OPTIONS = {
  chart: {
    id: "rsi",
  },
  grid: {
    show: false,
  },
  legend: {
    show: false,
  },
  stroke: {
    width: [1],
    colors: ["#a222b0"],
  },
  yaxis: {
    min: 0,
    max: 100,
    labels: {
      minWidth: 50,
      maxWidth: 50,
    },
  },
  annotations: {
    yaxis: [
      {
        y: 30,
        y2: 70,
        fillColor: "#a222b0",
        opacity: 0.2,
      },
    ],
  },
};

const RSI = ({ startingIndex, timeframe, data }) => {
  const dataForChart = data.length
    ? [
        {
          name: "rsi",
          type: "line",
          data: data
            .map((el) => el.rsi)
            .slice(startingIndex, startingIndex + timeframe),
        },
      ]
    : [];

  return (
    <RSIChart options={CHART_OPTIONS} series={dataForChart} height="160px" />
  );
};

export default RSI;
