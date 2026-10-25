import Draggable from "react-draggable";

const FibUp = () => {
  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      position={null}
      scale={1}
      onStart={(e) => e.target.handleStart}
      onDrag={(e) => e.target.handleDrag}
      onStop={(e) => e.target.handleStop}
    >
      <div className="fixed flex flex-col h-[378px] w-40 top-2 left-2 z-40 resize overflow-auto">
        <div className="relative h-[32.085%] w-full">
          <div className="absolute top-0 h-[0px] w-full border border-red-900">
            <p className="absolute top-0 text-white">-0.618</p>
          </div>
          <div className="absolute bottom-[43.6%] h-[0px] w-full border border-red-900">
            <p className="absolute text-white">-0.27</p>
          </div>
        </div>
        <div className="relative h-[52.91%] w-full border-t-2 border-b-2 border-sky-800 z-40">
          <div className="handle absolute top-0 right-0 bg-sky-800 h-6 w-6 text-white cursor-pointer z-40" />
          <div className="relative h-full w-full">
            <div className="absolute bottom-[50%] h-[0px] w-full border border-red-900">
              <p className="absolute text-white">0.5</p>
            </div>
            <div className="absolute top-[61.8%] h-[0px] w-full border border-amber-400">
              <p className="absolute text-white">0.618</p>
            </div>
          </div>
        </div>
        <div className="relative h-[14.285%] w-full">
          <div className="absolute bottom-[0%] h-[0px] w-full border border-red-900">
            <p className="absolute bottom-0 text-white">1.27</p>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default FibUp;
