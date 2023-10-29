import { server } from "@/app/_trpc/serverClient";
import { TableSearch } from "@/server/routers/table";
import { NextRequest } from "next/server";
import * as z from "zod";

// export async function GET(req: NextRequest) {
//   const searchParams = req.nextUrl.searchParams;
//   const charId = searchParams.get("charId");
//   // TODO: error handling
//   if (!!charId) {
//     const data = await server.honkai.skill.byCharId({ charId: Number(charId) });
//     return Response.json(data);
//   }

//   const data = await server.honkai.skill.list({});
//   return Response.json(data);
// }

export async function POST(req: NextRequest) {
  const payload = await req.json();

  const parse = TableSearch.safeParse(payload);
  if (parse.success) {
    const { pagination, tableName } = parse.data;

    const res = await server.table.list({ pagination, tableName });

    return Response.json({ ...res });
  } else {
    return Response.json(
      { data: null, error: parse.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
}
