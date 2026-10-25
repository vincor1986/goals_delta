import Draggable from "react-draggable";

const HLine = () => {
  return (
    <Draggable
      axis="both"
      defaultPosition={{ x: 0, y: 0 }}
      handle={".handle"}
      position={null}
      scale={1}
      onStart={(e) => e.target.handleStart}
      onDrag={(e) => e.target.handleDrag}
      onStop={(e) => e.target.handleStop}
    >
      <div className="fixed top-[100px] left-[55px] w-[500px] z-40 h-1 rounded-full bg-zinc-200 opacity-50 resize-x overflow-auto">
        <div className="relative w-full h-full">
          <div className="handle absolute left-0 top-1/2 -translate-y-1/2 w-[20px] h-[20px] z-40 bg-sky-800 rounded-full cursor-pointer"></div>
        </div>
      </div>
    </Draggable>
  );
};

export default HLine;
