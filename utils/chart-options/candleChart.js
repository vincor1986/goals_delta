const CHART_OPTIONS = {
  chart: {
    id: `GD Chart`,
    type: "candlestick",
    height: "580px",
    offsetY: 40,
    zoom: {
      autoScaleYaxis: true,
    },
  },
  grid: {
    borderColor: "#666",
  },
  legend: {
    show: false,
  },

  stroke: {
    colors: ["#ccc", "#F7BE53", "#53BEF7", "#53BEF7"],
    width: [1, 2],
  },
  plotOptions: {
    candlestick: {
      wick: {
        useFillColor: false,
      },
    },
  },
  yaxis: {
    labels: {
      minWidth: 50,
      maxWidth: 50,
    },
  },
};

export default CHART_OPTIONS;
