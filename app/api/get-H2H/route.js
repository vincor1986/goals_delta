import { NextResponse } from "next/server";

import formatH2HData from "@/utils/formatters/formatH2HData";

export const POST = async (req) => {
  try {
    const { data } = await req.json();

    const formattedData = formatH2HData(data);

    return NextResponse.json({ h2h: formattedData }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
};
