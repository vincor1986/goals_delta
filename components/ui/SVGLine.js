const SVGLine = ({ points }) => (
  <svg
    className="absolute top-0 left-0 z-50"
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1={points.x}
      y1={points.y}
      x2={points.x2}
      y2={points.y2}
      strokeWidth={4}
      vectorEffect={"non-scaling-stroke"}
      stroke={"gold"}
    />
  </svg>
);

export default SVGLine;
