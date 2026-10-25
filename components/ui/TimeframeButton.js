const TimeFrameButton = ({ tf, timeframe, setTimeframe }) => {
  return (
    <button
      className={`h-8 w-16 rounded-md font-bold text-xs bg-zinc-700 text-white cursor-pointer hover:bg-zinc-600 transition-all duration-300 ${
        timeframe == tf ? "border-2 border-sky-900" : null
      }`}
      onClick={() => setTimeframe(tf)}
    >
      {tf}M
    </button>
  );
};

export default TimeFrameButton;
