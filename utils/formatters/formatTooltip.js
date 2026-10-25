const formatTooltip = ([_, [o, h, l, c], { home, opponent, league }]) => {
  if (!o) return;
  const positive = c - o > 0;

  return `<p style="font-weight: bold">${league} - ${
    home ? "Home match" : "Away match"
  }</p>
    <p style="font-weight: bold">vs ${opponent}</p>
    <p>O: ${o} H: ${h} L: ${l} C: ${c}</p>
    <p>GD: ${positive ? "+" : ""}${c - o}</p>
    `;
};

export default formatTooltip;
