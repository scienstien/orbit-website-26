export const DAUTH_AUTHORIZATION_URL = "https://auth.delta.nitt.edu/authorize";
export const DAUTH_TOKEN_URL = "https://auth.delta.nitt.edu/api/oauth/token";
export const DAUTH_USER_INFO_URL =
  "https://auth.delta.nitt.edu/api/resources/user";
export const DAUTH_DEBUG_STATE_COOKIE = "dauth_debug_state";
export const DAUTH_SCOPES = ["openid", "email", "profile", "user"];
export const DAUTH_DEBUG_SCOPES = DAUTH_SCOPES;

export function isDauthDebugEnabled() {
  return process.env.DAUTH_DEBUG === "true";
}

export function encodeDebugPayload(payload: unknown) {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

export function decodeDebugPayload(encoded: string) {
  return JSON.parse(
    Buffer.from(encoded, "base64url").toString("utf8"),
  ) as unknown;
}

export function getDauthDebugRedirectUri(origin: string) {
  return (
    process.env.DAUTH_DEBUG_REDIRECT_URI ?? `${origin}/api/dauth-debug/callback`
  );
}

export function redactTokenResponse(tokenResponse: Record<string, unknown>) {
  const redactedKeys = new Set([
    "access_token",
    "accessToken",
    "refresh_token",
    "refreshToken",
    "id_token",
    "idToken",
  ]);

  return Object.fromEntries(
    Object.entries(tokenResponse).map(([key, value]) => {
      if (redactedKeys.has(key)) {
        return [key, value ? "[redacted]" : value];
      }

      return [key, value];
    }),
  );
}
