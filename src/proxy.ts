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

function redirectTo(pathname: string, request: NextRequest) {
  return NextResponse.redirect(new URL(pathname, request.url));
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

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user?.id) {
    if (pathname === SET_PASSWORD_PAGE) {
      return redirectTo(LOGIN_PAGE, request);
    }

    return NextResponse.next();
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { passwordSetAt: true, role: true },
  });

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
