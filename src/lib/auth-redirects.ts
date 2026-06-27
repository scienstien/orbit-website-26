import { UserRole } from "@/generated/prisma/enums";

const INTERNAL_REDIRECT_ORIGIN = "https://orbit.local";
const MAX_REDIRECT_TARGET_LENGTH = 2048;
const ENCODED_CONTROL_CHARACTER_PATTERN = /%(?:0[0-9a-f]|1[0-9a-f]|7f)/i;
const ENCODED_LEADING_SLASH_OR_BACKSLASH_PATTERN = /^\/(?:%2f|%5c)/i;
const ENCODED_BACKSLASH_PATTERN = /%5c/i;

export const BLOG_PAGE = "/blogpage";
export const AUTH_REDIRECT_PAGE = "/auth/redirect";
export const LOGIN_PAGE = "/login";
export const SET_PASSWORD_PAGE = "/setpassword";
export const SIGNUP_PAGE = "/signup";
export const TARGET_URI_PARAM = "targetUri";

const BLOCKED_REDIRECT_PATHS = new Set([
  AUTH_REDIRECT_PAGE,
  LOGIN_PAGE,
  SET_PASSWORD_PAGE,
  SIGNUP_PAGE,
]);

function firstParamValue(value: unknown) {
  return Array.isArray(value) ? value[0] : value;
}

function hasControlCharacters(value: string) {
  for (let index = 0; index < value.length; index++) {
    const code = value.charCodeAt(index);

    if (code <= 31 || code === 127) {
      return true;
    }
  }

  return false;
}

function normalizeRedirectPath(value: unknown) {
  const candidate = firstParamValue(value);

  if (typeof candidate !== "string") {
    return null;
  }

  if (
    !candidate ||
    candidate.length > MAX_REDIRECT_TARGET_LENGTH ||
    candidate.trim() !== candidate ||
    hasControlCharacters(candidate) ||
    ENCODED_CONTROL_CHARACTER_PATTERN.test(candidate) ||
    candidate.includes("\\") ||
    ENCODED_BACKSLASH_PATTERN.test(candidate) ||
    !candidate.startsWith("/") ||
    candidate.startsWith("//") ||
    ENCODED_LEADING_SLASH_OR_BACKSLASH_PATTERN.test(candidate)
  ) {
    return null;
  }

  let url: URL;

  try {
    url = new URL(candidate, INTERNAL_REDIRECT_ORIGIN);
  } catch {
    return null;
  }

  if (url.origin !== INTERNAL_REDIRECT_ORIGIN) {
    return null;
  }

  const pathname = url.pathname;
  const lowerPathname = pathname.toLowerCase();

  if (
    !pathname.startsWith("/") ||
    pathname.startsWith("//") ||
    BLOCKED_REDIRECT_PATHS.has(lowerPathname) ||
    lowerPathname === "/api" ||
    lowerPathname.startsWith("/api/") ||
    lowerPathname === "/_next" ||
    lowerPathname.startsWith("/_next/")
  ) {
    return null;
  }

  return `${pathname}${url.search}${url.hash}`;
}

export function getSafeRedirectPath(value: unknown, fallback = BLOG_PAGE) {
  return (
    normalizeRedirectPath(value) ?? normalizeRedirectPath(fallback) ?? BLOG_PAGE
  );
}

export function getPathWithTargetUri(path: string, targetUri: unknown) {
  const url = new URL(path, INTERNAL_REDIRECT_ORIGIN);

  url.searchParams.set(TARGET_URI_PARAM, getSafeRedirectPath(targetUri));

  return `${url.pathname}${url.search}`;
}

export function getPostLoginRedirectPath(user: { role: UserRole }) {
  switch (user.role) {
    case UserRole.USER:
      return BLOG_PAGE;
    default:
      return BLOG_PAGE;
  }
}
