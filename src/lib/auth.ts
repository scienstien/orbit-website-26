import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth } from "better-auth/plugins";
import { UserRole } from "@/generated/prisma/enums";
import { db } from "../../db";
import {
  DAUTH_AUTHORIZATION_URL,
  DAUTH_SCOPES,
  DAUTH_TOKEN_URL,
  DAUTH_USER_INFO_URL,
} from "./dauth-debug";
import { normalizeDauthProfile } from "./dauth-profile";

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not set`);
  }

  return value;
}

async function readDauthUserInfo(accessToken: string) {
  const response = await fetch(DAUTH_USER_INFO_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`DAuth userinfo request failed with ${response.status}`);
  }

  const profile = (await response.json()) as Record<string, unknown>;
  const nestedProfile = profile.user ?? profile.data;

  const rawProfile =
    nestedProfile &&
    typeof nestedProfile === "object" &&
    !Array.isArray(nestedProfile)
      ? (nestedProfile as Record<string, unknown>)
      : profile;
  const dauthProfile = normalizeDauthProfile(rawProfile);

  return {
    ...rawProfile,
    batch: dauthProfile.batch,
    dauthId: dauthProfile.dauthId,
    email: dauthProfile.email,
    emailVerified: true,
    id: dauthProfile.dauthId,
    name: dauthProfile.name,
  };
}
const USER_ROLE_VALUES = [
  UserRole.USER,
  UserRole.WRITER,
  UserRole.EDITOR,
  UserRole.ADMIN,
];

export const auth = betterAuth({
  basePath: "/api/auth",
  user: {
    additionalFields: {
      role: {
        type: USER_ROLE_VALUES,
        required: false,
        input: false,
        defaultValue: UserRole.USER,
      },
      dauthId: {
        type: "string",
        required: false,
        input: false,
      },
      batch: {
        type: "string",
        required: false,
        input: false,
      },
      passwordSetAt: {
        type: "date",
        required: false,
        input: false,
      },
    },
  },
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
          authorizationUrl: DAUTH_AUTHORIZATION_URL,
          disableImplicitSignUp: true,
          tokenUrl: DAUTH_TOKEN_URL,
          scopes: DAUTH_SCOPES,
          async getUserInfo(tokens) {
            if (!tokens.accessToken) {
              return null;
            }

            return readDauthUserInfo(tokens.accessToken);
          },
          mapProfileToUser(profile: Record<string, unknown>) {
            const dauthProfile = normalizeDauthProfile(profile);

            return {
              batch: dauthProfile.batch,
              dauthId: dauthProfile.dauthId,
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
