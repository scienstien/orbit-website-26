import { NextResponse } from "next/server";

import {
  DAUTH_AUTHORIZATION_URL,
  DAUTH_DEBUG_SCOPES,
  DAUTH_DEBUG_STATE_COOKIE,
  getDauthDebugRedirectUri,
  isDauthDebugEnabled,
} from "@/lib/dauth-debug";

export const runtime = "nodejs";

export function GET(request: Request) {
  if (!isDauthDebugEnabled()) {
    return NextResponse.json(
      { error: "DAuth debug is disabled" },
      { status: 404 },
    );
  }

  if (!process.env.DAUTH_CLIENT_ID) {
    return NextResponse.json(
      { error: "DAUTH_CLIENT_ID is not set" },
      { status: 500 },
    );
  }

  const requestUrl = new URL(request.url);
  const redirectUri = getDauthDebugRedirectUri(requestUrl.origin);
  const state = crypto.randomUUID();
  const nonce = crypto.randomUUID();
  const authorizationUrl = new URL(DAUTH_AUTHORIZATION_URL);

  authorizationUrl.searchParams.set("client_id", process.env.DAUTH_CLIENT_ID);
  authorizationUrl.searchParams.set("redirect_uri", redirectUri);
  authorizationUrl.searchParams.set("response_type", "code");
  authorizationUrl.searchParams.set("grant_type", "authorization_code");
  authorizationUrl.searchParams.set("scope", DAUTH_DEBUG_SCOPES.join(" "));
  authorizationUrl.searchParams.set("state", state);
  authorizationUrl.searchParams.set("nonce", nonce);

  const response = NextResponse.redirect(authorizationUrl);

  response.cookies.set(DAUTH_DEBUG_STATE_COOKIE, state, {
    httpOnly: true,
    maxAge: 10 * 60,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
