import { NextRequest, NextResponse } from "next/server";
import { getPlaiceholder } from "plaiceholder";

export const POST = async (request: NextRequest) => {
  const { src } = await request.json();

  try {
    const buffer = await fetch(src).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );

    const { base64 } = await getPlaiceholder(buffer);

    return new NextResponse(JSON.stringify({ base64 }), { status: 200 });
  } catch (err) {
    return new NextResponse("Failed to create a new prompt", { status: 500 });
  }
};
