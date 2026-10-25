const IndicatorButton = ({ active, toggleActive, children }) => {
  return (
    <button
      className={`${
        active ? "border-2 border-amber-500" : ""
      } relative flex items-center justify-center h-8 w-16 rounded-md text-sm font-bold bg-zinc-700 text-white z-[100] cursor-pointer hover:bg-zinc-600 transition-all duration-300`}
      onClick={() => toggleActive((prev) => !prev)}
    >
      {children}
    </button>
  );
};

export default IndicatorButton;
