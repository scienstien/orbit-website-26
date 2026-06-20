import { type NextRequest, NextResponse } from "next/server";
import { db } from "../db";
import { auth } from "./lib/auth";
import {
  BLOG_PAGE,
  getPostLoginRedirectPath,
  LOGIN_PAGE,
  SET_PASSWORD_PAGE,
} from "./lib/auth-redirects";

const AUTH_API_PREFIX = "/api/auth";

type ProxyUser = {
  passwordSetAt: Date | null;
  role: NonNullable<Awaited<ReturnType<typeof db.user.findUnique>>>["role"];
};

function redirectTo(pathname: string, request: NextRequest) {
  return NextResponse.redirect(new URL(pathname, request.url));
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
      return redirectTo(LOGIN_PAGE, request);
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
      return redirectTo(SET_PASSWORD_PAGE, request);
    }

    return rejectPasswordSetupRequired();
  }

  if (pathname === SET_PASSWORD_PAGE) {
    return redirectTo(BLOG_PAGE, request);
  }

  if (pathname === LOGIN_PAGE) {
    return redirectTo(getPostLoginRedirectPath(user), request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map)$).*)",
  ],
};
