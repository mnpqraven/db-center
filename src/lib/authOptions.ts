import GithubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";
import { env } from "@/env.mjs";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
};