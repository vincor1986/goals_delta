import formatTooltip from "./formatTooltip";

const formatBox = (output) =>
  '<div className="arrow_box" style="padding: 8px">' +
  "<span>" +
  output +
  "</span>" +
  "</div>";

const tooltipFn = [
  ({ seriesIndex, dataPointIndex, w }) => {
    const tickData = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
    return formatBox(formatTooltip(tickData));
  },
  ({ seriesIndex, dataPointIndex, w }) => {
    const tickData =
      w.globals.initialSeries[seriesIndex].data[dataPointIndex][1];
    return formatBox("EMA12: " + tickData);
  },
  () => {},
  () => {},
];

export default tooltipFn;
