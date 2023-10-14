import { server } from "@/app/_trpc/serverClient";
import { NextRequest } from "next/server";
import * as z from "zod";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const charId = searchParams.get("charId");
  // TODO: error handling
  if (!!charId) {
    const data = await server.honkai.item.list({});
    return Response.json(data);
  }

  const data = await server.honkai.skill.list({});
  return Response.json(data);
}

export async function POST(req: NextRequest) {
  const payload = await req.json();
  try {
    const data = await server.honkai.item.list({});

    return Response.json(data);
  } catch {
    return Response.json({ success: false });
  }
}
