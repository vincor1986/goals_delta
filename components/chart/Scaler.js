"use client";

import { useRef, useEffect, useState, useCallback } from "react";

import Draggable from "react-draggable";

const Scaler = () => {
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
      <div className="fixed top-[100px] left-[100px] w-[300px] h-[200px] border-l-4 border-r-4 border-sky-800 border-r-amber-600 border-opacity-80 z-40 resize overflow-auto text-sky-200">
        <div className="relative h-full w-full">
          <div className="handle absolute top-0 left-0 bg-sky-800 h-6 w-6 cursor-pointer z-40" />
          {/* 1/3 */}
          <div className="absolute left-1/3 h-full w-1 bg-amber-600 opacity-80">
            <div className="relative h-full w-full">
              <div className="absolute top-0 left-0 text-xs p-2">1/3</div>
            </div>
          </div>
          {/* x */}
          <div className="absolute left-1/2 h-full w-1 bg-sky-800 opacity-80">
            <div className="relative h-full w-full">
              <div className="absolute top-0 left-0 text-xs p-2">x</div>
            </div>
          </div>
          {/* x/3 */}
          <div className="absolute left-2/3 h-full w-1 bg-amber-600 opacity-80">
            <div className="relative h-full w-full">
              <div className="absolute top-0 left-0 text-xs p-2">x/3</div>
            </div>
          </div>
          {/* x/9 */}
          <div className="absolute left-[calc(50%+(50%/9))] h-full w-1 bg-sky-800 opacity-80">
            <div className="relative h-full w-full">
              <div className="absolute top-0 left-0 text-xs p-2">x/9</div>
            </div>
          </div>
          {/* x/27 */}
          <div className="absolute left-[calc(50%+(50%/27))] h-full w-1 bg-sky-800 opacity-80">
            <div className="relative h-full w-full">
              <div className="absolute top-0 left-0 text-xs p-2">x/27</div>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Scaler;
