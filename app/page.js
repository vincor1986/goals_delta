"use client";

import { useState, useEffect, useMemo } from "react";

import TeamSelect from "@/components/TeamSelect";
import Chart from "@/components/chart/Chart";

import TEAMS from "../data/TEAMS.json";
import CHART_DATA from "../data/GD_CHART_DATA_3.json";
import Link from "next/link";

const fetchH2HData = async (inputData) => {
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: inputData }),
  };

  let h2hData;

  try {
    const response = await fetch("/api/get-H2H", params);
    h2hData = await response.json();
  } catch (err) {
    console.log("error fetching h2h:", err);
    return [];
  }

  return h2hData.h2h;
};

const Home = () => {
  const [team, setTeam] = useState("Choose team...");
  const [h2hTeam, setH2HTeam] = useState("Choose team...");
  const [teamData, setTeamData] = useState([]);

  const h2hTeams = useMemo(
    () =>
      Array.from(new Set(teamData.map((el) => el.opponent))).filter((t) =>
        TEAMS.includes(t)
      ),
    [team, h2hTeam, teamData]
  );

  useEffect(() => {
    if (team !== "Choose team...") {
      if (h2hTeam === "Choose team...") {
        setTeamData(CHART_DATA[team]);
      } else {
        (async () => {
          const h2hData = await fetchH2HData(
            CHART_DATA[team].filter((el) => el.opponent === h2hTeam)
          );
          setTeamData(h2hData);
        })();
      }
    }
  }, [team, h2hTeam]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="flex gap-6 absolute top-2 right-2">
        <Link href="/add">
          <button className="flex items-center justify-center w-20 h-6 bg-sky-800 text-white rounded-lg p-2 text-xs hover:bg-sky-700 cursor-pointer transition-all duration-300">
            <p>Add</p>
          </button>
        </Link>
        <TeamSelect
          teams={TEAMS.sort((a, b) => a.localeCompare(b))}
          team={team}
          setTeam={setTeam}
          disabled={false}
        />
        <div className="h-full pt-[6px] flex items-center justify-center">
          <p className="text-xs font-bold ml-4">H2H Team:</p>
        </div>
        <TeamSelect
          teams={h2hTeams
            .sort((a, b) => a.localeCompare(b))
            .filter((t) => t !== team)}
          team={h2hTeam}
          setTeam={setH2HTeam}
          disabled={team === "Choose team..."}
          allowNone={true}
        />
      </div>
      <Chart team={team} data={teamData} h2hTeam={h2hTeam} />
    </div>
  );
};

export default Home;
