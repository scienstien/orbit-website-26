import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  DAUTH_DEBUG_STATE_COOKIE,
  DAUTH_TOKEN_URL,
  DAUTH_USER_INFO_URL,
  encodeDebugPayload,
  getDauthDebugRedirectUri,
  isDauthDebugEnabled,
  redactTokenResponse,
} from "@/lib/dauth-debug";

export const runtime = "nodejs";

function redirectToDebugPage(
  request: NextRequest,
  params: Record<string, string>,
) {
  const url = new URL("/dauth-debug", request.url);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = NextResponse.redirect(url);
  response.cookies.delete(DAUTH_DEBUG_STATE_COOKIE);

  return response;
}

async function readJsonResponse(response: Response) {
  const text = await response.text();

  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return { raw: text };
  }
}

export async function GET(request: NextRequest) {
  if (!isDauthDebugEnabled()) {
    return NextResponse.json(
      { error: "DAuth debug is disabled" },
      { status: 404 },
    );
  }

  if (!process.env.DAUTH_CLIENT_ID || !process.env.DAUTH_SECRET) {
    return redirectToDebugPage(request, {
      error: "DAUTH_CLIENT_ID or DAUTH_SECRET is not set",
    });
  }

  const requestUrl = new URL(request.url);
  const error = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");

  if (error) {
    return redirectToDebugPage(request, {
      error: errorDescription ? `${error}: ${errorDescription}` : error,
    });
  }

  const code = requestUrl.searchParams.get("code");
  const state = requestUrl.searchParams.get("state");
  const expectedState = request.cookies.get(DAUTH_DEBUG_STATE_COOKIE)?.value;

  if (!code) {
    return redirectToDebugPage(request, {
      error: "DAuth callback did not include code",
    });
  }

  if (!state || !expectedState || state !== expectedState) {
    return redirectToDebugPage(request, {
      error: "DAuth callback state mismatch",
    });
  }

  const redirectUri = getDauthDebugRedirectUri(requestUrl.origin);
  const tokenBody = new URLSearchParams({
    client_id: process.env.DAUTH_CLIENT_ID,
    client_secret: process.env.DAUTH_SECRET,
    code,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
  });

  const tokenResponse = await fetch(DAUTH_TOKEN_URL, {
    body: tokenBody,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });

  const tokenJson = await readJsonResponse(tokenResponse);

  if (!tokenResponse.ok) {
    return redirectToDebugPage(request, {
      error: encodeDebugPayload({
        message: `DAuth token request failed with status ${tokenResponse.status}`,
        tokenResponse: redactTokenResponse(tokenJson),
      }),
    });
  }

  const accessToken = String(
    tokenJson.access_token ?? tokenJson.accessToken ?? "",
  );

  if (!accessToken) {
    return redirectToDebugPage(request, {
      error: encodeDebugPayload({
        message: "DAuth token response did not include an access token",
        tokenResponse: redactTokenResponse(tokenJson),
      }),
    });
  }

  const userInfoResponse = await fetch(DAUTH_USER_INFO_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
  });

  const userInfo = await readJsonResponse(userInfoResponse);
  const result = {
    tokenResponse: redactTokenResponse(tokenJson),
    userInfo,
    userInfoStatus: userInfoResponse.status,
  };

  if (!userInfoResponse.ok) {
    return redirectToDebugPage(request, {
      error: encodeDebugPayload({
        message: `DAuth userinfo request failed with status ${userInfoResponse.status}`,
        ...result,
      }),
    });
  }

  return redirectToDebugPage(request, {
    result: encodeDebugPayload(result),
  });
}
