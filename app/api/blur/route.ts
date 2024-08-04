import { getPlaiceholder } from "plaiceholder";

export async function POST(request: Request) {
  const body = await request.json();

  const { src } = body;

  try {
    const buffer = await fetch(src).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );

    const { base64 } = await getPlaiceholder(buffer);

    // console.log(base64);

    return Response.json({ base64, message: "done" });
  } catch (err) {
    err;
  }
}
