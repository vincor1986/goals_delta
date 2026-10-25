import Chart from "react-apexcharts";

const CHART_OPTIONS = {
  chart: {
    id: "ADX",
  },
  title: {
    text: "ADX (14)",
    offsetX: 50,
  },
  grid: {
    show: false,
  },
  legend: {
    show: false,
  },
  stroke: {
    width: [2],
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
        y: 0,
        y2: 100,
        //fillColor: "#a222b0",
        opacity: 0.05,
      },
    ],
  },
};

const ADX = ({ period, data = [] }) => {
  return (
    <Chart
      options={{
        ...CHART_OPTIONS,
        title: { text: `ADX (${period})`, offsetX: 50 },
      }}
      series={data}
      height="160px"
    />
  );
};

export default ADX;
