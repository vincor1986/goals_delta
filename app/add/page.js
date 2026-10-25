"use client";

import { useState } from "react";
import TEAMS from "../../data/TEAMS.json";
import Link from "next/link";

import { IconLoader } from "@/components/ui/icons";

const LEAGUES = [
  "CHAMPIONSHIP",
  "EFLTROPHY",
  "EPL",
  "EUROPA",
  "EUROPACONFERENCE",
  "FACUP",
  "LEAGUECUP",
  "UCL",
];

const DEFAULT_DATA = {
  homeTeam: "default",
  awayTeam: "default",
  league: "default",
  homeGD: 0,
  homeHigh: 0,
  homeLow: 0,
};

const AddPage = () => {
  const [data, setData] = useState(DEFAULT_DATA);
  const [loading, setLoading] = useState(false);

  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const submitData = async () => {
    if ([data.homeTeam, data.awayTeam, data.league].includes("default")) {
      alert("All fields are required");
      return;
    }

    if (data.homeTeam === data.awayTeam) {
      alert("Home and away team must be different");
      return;
    }

    setLoading(true);

    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const res = await fetch("/api/newData", params);
      const result = await res.json();

      if (result.message) {
        alert(result.message);
        setLoading(false);
        setData(DEFAULT_DATA);
        return;
      } else if (result.error) {
        alert(result.error);
        setLoading(false);
        return;
      }

      setLoading(false);
      return;
    } catch (err) {
      alert(err.message);
      setLoading(false);
      return;
    }
  };

  return (
    <div className="flex flex-col p-4 border border-sky-800 rounded-sm items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-sky-900">Add Match Data</h1>
      <hr className="h-2 bg-zinc-200 my-2" />
      <div className="p-2 border w-96 border-zinc-50 rounded-sm grid grid-cols-5">
        <label className="col-span-2 font-bold text-sm" htmlFor="league">
          League:
        </label>
        <select
          id="league"
          name="league"
          value={data.league}
          onChange={updateData}
          className="border border-zinc-50 rounded-sm col-span-3 w-full"
        >
          <option value="default" disabled>
            Choose league...
          </option>
          {LEAGUES.sort((a, b) => a.localeCompare(b)).map((league) => (
            <option key={league} value={league}>
              {league}
            </option>
          ))}
        </select>
      </div>
      <div className="p-2 border w-96 border-zinc-50 rounded-sm grid grid-cols-5">
        <label className="col-span-2 font-bold text-sm" htmlFor="homeTeam">
          Home Team:
        </label>
        <select
          id="homeTeam"
          name="homeTeam"
          value={data.homeTeam}
          onChange={updateData}
          className="border border-zinc-50 rounded-sm col-span-3 w-full"
        >
          <option value="default" disabled>
            Choose home team...
          </option>
          {[...TEAMS, "Other"]
            .sort((a, b) => a.localeCompare(b))
            .map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
        </select>
      </div>
      <div className="p-2 border w-96 border-zinc-50 rounded-sm grid grid-cols-5">
        <label className="col-span-2 font-bold text-sm" htmlFor="awayTeam">
          Away Team:
        </label>
        <select
          id="awayTeam"
          name="awayTeam"
          value={data.awayTeam}
          onChange={updateData}
          className="border border-zinc-50 rounded-sm col-span-3 w-full"
        >
          <option value="default" disabled>
            Choose away team...
          </option>
          {[...TEAMS, "Other"]
            .sort((a, b) => a.localeCompare(b))
            .map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
        </select>
      </div>
      <div className="p-2 border w-96 border-zinc-50 rounded-sm grid grid-cols-5">
        <label className="col-span-2 font-bold text-sm" htmlFor="homeGD">
          Home GD:
        </label>
        <input
          type="number"
          name="homeGD"
          id="homeGD"
          value={data.homeGD}
          onChange={updateData}
          className="border border-zinc-50 rounded-sm col-span-3 w-full"
        />
      </div>
      <div className="p-2 border w-96 border-zinc-50 rounded-sm grid grid-cols-5">
        <label className="col-span-2 font-bold text-sm" htmlFor="homeHigh">
          Home High:
        </label>
        <input
          type="number"
          name="homeHigh"
          id="homeHigh"
          value={data.homeHigh}
          onChange={updateData}
          className="border border-zinc-50 rounded-sm col-span-3 w-full"
        />
      </div>
      <div className="p-2 border w-96 border-zinc-50 rounded-sm grid grid-cols-5">
        <label className="col-span-2 font-bold text-sm" htmlFor="homeLow">
          Home Low:
        </label>
        <input
          type="number"
          name="homeLow"
          id="homeLow"
          value={data.homeLow}
          onChange={updateData}
          className="border border-zinc-50 rounded-sm col-span-3 w-full"
        />
      </div>
      <hr />
      <button
        className="flex items-center justify-center w-28 h-8 mt-4 bg-sky-800 text-white rounded-md font-bold text-xs cursor-pointer hover:bg-sky-700 transition-all duration-300"
        onClick={submitData}
        disabled={loading}
      >
        {loading ? (
          <div className="animate-spin duration-300">
            <IconLoader />
          </div>
        ) : (
          "Submit"
        )}
      </button>
      <div className="flex gap-3 fixed top-2 right-2">
        <button
          className="w-28 h-8 mt-4 bg-zinc-800 text-white rounded-md font-bold text-xs cursor-pointer hover:bg-zinc-700 transition-all duration-300"
          onClick={() => setData(DEFAULT_DATA)}
        >
          Reset form
        </button>
        <Link href="/">
          <button className="w-28 h-8 mt-4 bg-zinc-800 text-white rounded-md font-bold text-xs cursor-pointer hover:bg-zinc-700 transition-all duration-300">
            Chart
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AddPage;
