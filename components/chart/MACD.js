"use client";

import { useState, useEffect } from "react";
import MACDChart from "react-apexcharts";

const CHART_OPTIONS = {
  chart: {
    id: "macd",
    height: "250px",
    width: "100%",
  },
  title: {
    text: "MACD (12, 26, 9)",
    offsetX: 50,
  },
  grid: {
    show: false,
  },
  legend: {
    show: false,
  },
  fill: {
    colors: [
      "#53BEF7",
      "#e6bd29",
      ({ value }) => (value > 0 ? "#0F0" : "#F00"),
    ],
  },
  stroke: {
    width: [1, 1, 0],
    colors: ["#2299F7", "#e6bd29", "#000"],
  },
  yaxis: {
    labels: {
      minWidth: 50,
      maxWidth: 50,
    },
  },
};

const MACD = ({ startingIndex, timeframe, data = [] }) => {
  const dataForChart = data.length
    ? [
        {
          name: "MACD",
          type: "line",
          data: data
            .map((el) => el.macd)
            .slice(startingIndex, startingIndex + timeframe),
        },
        {
          name: "signal",
          type: "line",
          data: data
            .map((el) => el.signal)
            .slice(startingIndex, startingIndex + timeframe),
        },
        {
          name: "histogram",
          type: "bar",
          data: data
            .map((el) => el.histogram)
            .slice(startingIndex, startingIndex + timeframe),
        },
      ]
    : [];

  return (
    <MACDChart options={CHART_OPTIONS} series={dataForChart} height="180px" />
  );
};

export default MACD;
