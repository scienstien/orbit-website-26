import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth } from "better-auth/plugins";
import { db } from "../../db";
import { normalizeDauthProfile } from "./dauth-profile";

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not set`);
  }

  return value;
}

export const auth = betterAuth({
  basePath: "/api/auth",
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    minPasswordLength: 8,
  },
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "dauth",
          clientId: getRequiredEnv("DAUTH_CLIENT_ID"),
          clientSecret: getRequiredEnv("DAUTH_SECRET"),
          authorizationUrl: "https://auth.delta.nitt.edu/authorize",
          tokenUrl: "https://auth.delta.nitt.edu/api/oauth/token",
          userInfoUrl: "https://auth.delta.nitt.edu/api/resources/user",
          scopes: ["openid", "email", "profile", "user"],
          mapProfileToUser(profile: Record<string, unknown>) {
            const dauthProfile = normalizeDauthProfile(profile);

            return {
              email: dauthProfile.email,
              emailVerified: true,
              name: dauthProfile.name,
            };
          },
        },
      ],
    }),
    nextCookies(),
  ],
});
