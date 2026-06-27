import { type NextRequest, NextResponse } from "next/server";
import { db } from "../db";
import { auth } from "./lib/auth";
import {
  AUTH_REDIRECT_PAGE,
  BLOG_PAGE,
  getPostLoginRedirectPath,
  getSafeRedirectPath,
  LOGIN_PAGE,
  SET_PASSWORD_PAGE,
  TARGET_URI_PARAM,
} from "./lib/auth-redirects";

const AUTH_API_PREFIX = "/api/auth";

type ProxyUser = {
  passwordSetAt: Date | null;
  role: NonNullable<Awaited<ReturnType<typeof db.user.findUnique>>>["role"];
};

function getPathWithSearch(request: NextRequest) {
  return `${request.nextUrl.pathname}${request.nextUrl.search}`;
}

function getExplicitTargetUri(request: NextRequest) {
  return request.nextUrl.searchParams.get(TARGET_URI_PARAM);
}

function getPasswordSetupTargetUri(request: NextRequest) {
  if (
    request.nextUrl.pathname === AUTH_REDIRECT_PAGE ||
    request.nextUrl.pathname === LOGIN_PAGE ||
    request.nextUrl.pathname === SET_PASSWORD_PAGE
  ) {
    return getSafeRedirectPath(getExplicitTargetUri(request));
  }

  return getSafeRedirectPath(getPathWithSearch(request));
}

function redirectTo(
  pathname: string,
  request: NextRequest,
  targetUri?: string | null,
) {
  const url = new URL(pathname, request.url);

  if (targetUri) {
    url.searchParams.set(TARGET_URI_PARAM, getSafeRedirectPath(targetUri));
  }

  return NextResponse.redirect(url);
}

function allowUnavailableAuth(request: NextRequest) {
  return request.method === "GET" || request.method === "HEAD";
}

function rejectUnavailableAuth() {
  return NextResponse.json(
    { error: "Authentication storage is unavailable." },
    { status: 503 },
  );
}

function rejectPasswordSetupRequired() {
  return NextResponse.json(
    { error: "Password setup is required." },
    { status: 403 },
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(AUTH_API_PREFIX)) {
    return NextResponse.next();
  }

  let session: Awaited<ReturnType<typeof auth.api.getSession>>;

  try {
    session = await auth.api.getSession({
      headers: request.headers,
    });
  } catch (error) {
    console.error("proxy:getSession failed", error);

    if (allowUnavailableAuth(request)) {
      return NextResponse.next();
    }

    return rejectUnavailableAuth();
  }

  if (!session?.user?.id) {
    if (pathname === SET_PASSWORD_PAGE) {
      return redirectTo(LOGIN_PAGE, request, getExplicitTargetUri(request));
    }

    return NextResponse.next();
  }

  let user: ProxyUser | null;

  try {
    user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { passwordSetAt: true, role: true },
    });
  } catch (error) {
    console.error("proxy:findUser failed", error);

    if (allowUnavailableAuth(request)) {
      return NextResponse.next();
    }

    return rejectUnavailableAuth();
  }

  if (!user?.passwordSetAt) {
    if (pathname === SET_PASSWORD_PAGE) {
      return NextResponse.next();
    }

    if (request.method === "GET" || request.method === "HEAD") {
      return redirectTo(
        SET_PASSWORD_PAGE,
        request,
        getPasswordSetupTargetUri(request),
      );
    }

    return rejectPasswordSetupRequired();
  }

  if (pathname === SET_PASSWORD_PAGE) {
    return redirectTo(
      getSafeRedirectPath(getExplicitTargetUri(request), BLOG_PAGE),
      request,
    );
  }

  if (pathname === LOGIN_PAGE) {
    return redirectTo(
      getSafeRedirectPath(
        getExplicitTargetUri(request),
        getPostLoginRedirectPath(user),
      ),
      request,
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map)$).*)",
  ],
};
