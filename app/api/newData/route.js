import { NextResponse } from "next/server";

import addMatchData from "@/utils/addMatchData";

export const POST = async (req) => {
  try {
    const body = await req.json();

    if (!body.homeTeam || !body.awayTeam || !body.league) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (body.homeTeam == body.awayTeam) {
      return NextResponse.json(
        { error: "Home and away team must be different" },
        { status: 400 }
      );
    }

    addMatchData(body);

    return NextResponse.json({ message: "Match data added" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
