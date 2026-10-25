"use client";

import { useState, useEffect, useMemo, useRef } from "react";

import CandleChart from "react-apexcharts";
import MACD from "./MACD";
import FibDown from "./FibDown";
import FibUp from "./FibUp";
import RSI from "./RSI.js";
import HLine from "./HLine";
import ADX from "./ADX";

import { IconEye, IconDraw } from "../ui/icons";

import IndicatorButton from "../ui/IndicatorButton";
import TimeFrameButton from "../ui/TimeframeButton";
import Scaler from "./Scaler";
import SVGLine from "../ui/SVGLine";

// formatters
import formatCandleData from "@/utils/formatters/formatCandleData";
import formatMAData from "@/utils/formatters/formatMAData";
import formatMACDData from "@/utils/formatters/formatMACD";
import formatADX from "@/utils/formatters/formatADXData";
import {
  formatBollingerBandsUpper,
  formatBollingerBandsLower,
} from "@/utils/formatters/formatBollinger";
import tooltipFn from "@/utils/formatters/tooltipFunction";

import CHART_OPTIONS from "@/utils/chart-options/candleChart";

const TIMEFRAMES = [90, 120, 150, 300, 900];
const ADX_PERIOD = 20;

const Chart = ({ team, data }) => {
  const [historyIndex, setHistoryIndex] = useState(1);
  const [timeframe, setTimeframe] = useState(90);

  const [showFibDown, setShowFibDown] = useState(false);
  const [showFibUp, setShowFibUp] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [showBB, setShowBB] = useState(true);
  const [showScaler, setShowScaler] = useState(false);
  const [showDrawing, setShowDrawing] = useState(false);
  const [backtestMode, setBacktestMode] = useState(false);

  const [drawing, setDrawing] = useState(false);
  const [lines, setLines] = useState([]);

  const canvasRef = useRef(null);

  const increment = useMemo(
    () => (backtestMode ? 1 : Math.round(timeframe / 3)),
    [timeframe, backtestMode]
  );

  let startingIndex = useMemo(
    () =>
      data.length
        ? data.length - timeframe - increment * (historyIndex - 1)
        : 0,
    [team, data, data.length, timeframe, historyIndex, increment]
  );

  if (startingIndex < 0) {
    startingIndex = 0;
  }

  const lookbackLimit = startingIndex === 0;
  const presentLimit = historyIndex === 1;

  const dataForChart = useMemo(() => {
    return data.length
      ? [
          {
            name: "candle",
            type: "candlestick",
            data: data
              .map(formatCandleData)
              .slice(startingIndex, startingIndex + timeframe),
          },
          {
            name: "moving avg",
            type: "line",
            data: data
              .map(formatMAData)
              .slice(startingIndex, startingIndex + timeframe),
          },
        ]
      : [];
  }, [data, data.length, startingIndex, timeframe, showBB]);

  data.length &&
    showBB &&
    dataForChart.push(
      ...[
        {
          name: "Bollinger Bands - Upper",
          type: "line",
          data: data
            .map((el) => el.close)
            .map(formatBollingerBandsUpper)
            .slice(startingIndex, startingIndex + timeframe),
        },
        {
          name: "Bollinger Bands - Lower",
          type: "line",
          data: data
            .map((el) => el.close)
            .map(formatBollingerBandsLower)
            .slice(startingIndex, startingIndex + timeframe),
        },
      ]
    );

  const ADXData = useMemo(() => {
    return data.length
      ? [
          {
            name: "ADX",
            type: "line",
            data: formatADX(data, ADX_PERIOD).slice(
              startingIndex,
              startingIndex + timeframe
            ),
          },
        ]
      : [];
  }, [data, data.length, startingIndex, timeframe, ADX_PERIOD]);

  useEffect(() => {
    if (drawing && canvasRef.current) {
      const { left, top } = canvasRef.current.getBoundingClientRect();
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;

      document.onmousemove = (e) => {
        setLines((prev) => {
          const updatedLines = [...prev];
          updatedLines[prev.length - 1] = {
            ...prev[prev.length - 1],
            x2: ((e.clientX - left) / width) * 100,
            y2: ((e.clientY - top) / height) * 100,
          };
          return updatedLines;
        });
      };
    } else if (!drawing) {
      document.onmousemove = () => {};
    }

    return () => {};
  }, [drawing, canvasRef.current]);

  useEffect(() => {
    backtestMode ? setHistoryIndex(250) : setHistoryIndex(1);
  }, [team]);

  const onDrawStart = (e) => {
    setDrawing(true);

    const { left, top } = canvasRef.current.getBoundingClientRect();
    const width = canvasRef.current.clientWidth;
    const height = canvasRef.current.clientHeight;

    setLines((prev) => [
      ...prev,
      {
        x: ((e.clientX - left) / width) * 100,
        y: ((e.clientY - top) / height) * 100,
        x2: ((e.clientX - left) / width) * 100,
        y2: ((e.clientY - top) / height) * 100,
      },
    ]);
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[830px] bg-zinc-800">
      {showFibDown ? <FibDown /> : null}
      {showFibUp ? <FibUp /> : null}
      {showLine ? <HLine /> : null}
      {showScaler ? <Scaler /> : null}
      <div className="relative w-full h-[500px] pb-1">
        {showDrawing ? (
          <div
            ref={canvasRef}
            className="absolute top-16 left-0 h-[calc(100%-64px)] w-full bg-transparent cursor-crosshair z-50"
            onMouseDown={onDrawStart}
            onMouseUp={() => setDrawing(false)}
          >
            <div className="relative w-full h-full">
              {lines.map((points) => (
                <SVGLine points={points} />
              ))}
            </div>
          </div>
        ) : null}
        <CandleChart
          options={{
            ...CHART_OPTIONS,
            tooltip: { custom: tooltipFn },
          }}
          series={dataForChart}
          type="candlestick"
          height="500px"
        />
        <div className="flex gap-2 p-2 fixed top-3 left-3">
          <button
            className="h-8 w-16 font-bold text-xl rounded-md bg-zinc-700 text-white cursor-pointer hover:bg-zinc-600 transition-all duration-300"
            onClick={() => setHistoryIndex((prev) => prev + 1)}
            disabled={lookbackLimit}
          >
            ←
          </button>
          <button
            className="h-8 w-16 rounded-md font-bold text-xl bg-zinc-700 text-white cursor-pointer hover:bg-zinc-600 transition-all duration-300"
            onClick={() => setHistoryIndex((prev) => prev - 1)}
            disabled={presentLimit}
          >
            →
          </button>
          <IndicatorButton active={showFibDown} toggleActive={setShowFibDown}>
            <IconEye className="h-4 w-4" />
            <p className="ml-1">F↓</p>
          </IndicatorButton>
          <IndicatorButton active={showFibUp} toggleActive={setShowFibUp}>
            <IconEye className="h-4 w-4" />
            <p className="ml-1">F↑</p>
          </IndicatorButton>
          <IndicatorButton active={showLine} toggleActive={setShowLine}>
            <IconEye className="h-4 w-4" />
            <p className="ml-1">&mdash;</p>
          </IndicatorButton>
          <IndicatorButton active={showScaler} toggleActive={setShowScaler}>
            <IconEye className="h-4 w-4" />
            <p className="ml-1">◫</p>
          </IndicatorButton>
          <IndicatorButton active={showDrawing} toggleActive={setShowDrawing}>
            <IconEye className="h-4 w-4" />
            <IconDraw className="h-4 w-4 ml-1" />
          </IndicatorButton>
          {TIMEFRAMES.map((tf) => (
            <TimeFrameButton
              key={tf}
              tf={tf}
              timeframe={timeframe}
              setTimeframe={setTimeframe}
            />
          ))}
          <div className="h-8 p-2 flex gap-1 items-center justify-center">
            <input
              type="checkbox"
              checked={showBB}
              onChange={(e) => setShowBB(e.target.checked)}
            />
            <p className="ml-1 text-xs font-bold text-zinc-400">
              Bollinger Bands
            </p>
          </div>
          <div className="h-8 p-2 flex gap-1 items-center justify-center">
            <input
              type="checkbox"
              checked={backtestMode}
              onChange={(e) => {
                backtestMode ? setHistoryIndex(1) : setHistoryIndex(250);
                setBacktestMode(e.target.checked);
              }}
            />
            <p className="ml-1 text-xs font-bold text-zinc-400">
              Backtest Mode
            </p>
          </div>
          <div
            className="h-8 p-2 flex justify-center items-center cursor-pointer"
            onClick={() => setLines([])}
          >
            <p className="text-xs font-bold select-none hover:underline cursor-pointer text-zinc-400">
              Clear drawings
            </p>
          </div>
        </div>
      </div>
      <div className="relative h-[160px] w-full pt-1">
        <ADX data={ADXData} period={ADX_PERIOD} />
      </div>
      <div className="relative h-[180px] w-full pt-1">
        <MACD
          startingIndex={startingIndex}
          timeframe={timeframe}
          data={data.map(formatMACDData)}
        />
      </div>
    </div>
  );
};

export default Chart;
