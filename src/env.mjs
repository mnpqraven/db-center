import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DB_URL: z.string(),
    DB_AUTH_TOKEN: z.string(),
    NEXTAUTH_SECRET: z.string(),
    ADMIN_IDENT: z.string(),
    GITHUB_ID: z.string(),
    GITHUB_SECRET: z.string(),
  },
  client: {
    // NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: {
    // NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  },
});
