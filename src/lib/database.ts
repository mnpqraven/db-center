import { createClient } from "@libsql/client";
import { env } from "../env.mjs";
import * as schema from "../dbSchemas";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({
  url: env.DB_URL,
  authToken: env.DB_AUTH_TOKEN,
});

/** database instance
 * @usage server only */
export const db = drizzle(client, { schema });
