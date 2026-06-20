import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { User } from "@/generated/prisma/client";
import { UserRole } from "@/generated/prisma/enums";
import { db } from "../../db";
import { auth } from "./auth";

const BLOG_PAGE = "/blogpage";

type AuthGuardErrorCode = "UNAUTHENTICATED" | "FORBIDDEN";

export class AuthGuardError extends Error {
  code: AuthGuardErrorCode;
  status: 401 | 403;

  constructor(code: AuthGuardErrorCode, message: string) {
    super(message);
    this.name = "AuthGuardError";
    this.code = code;
    this.status = code === "UNAUTHENTICATED" ? 401 : 403;
  }
}

export function isAuthGuardError(error: unknown): error is AuthGuardError {
  return error instanceof AuthGuardError;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return null;
    }

    return await db.user.findUnique({
      where: { id: session.user.id },
    });
  } catch (error) {
    console.error("auth-guards:getCurrentUser failed", error);
    throw error;
  }
}

export async function requireSession(): Promise<User> {
  const user = await getCurrentUser();

  if (!user) {
    throw new AuthGuardError("UNAUTHENTICATED", "Sign in is required.");
  }

  return user;
}

export function isAdmin(user: { role: UserRole }) {
  return user.role === UserRole.ADMIN;
}

export function isEditor(user: { role: UserRole }) {
  return user.role === UserRole.EDITOR || isAdmin(user);
}

export function isWriter(user: { role: UserRole }) {
  return user.role === UserRole.WRITER || isEditor(user);
}

export async function requireWriter(): Promise<User> {
  const user = await requireSession();

  if (!isWriter(user)) {
    throw new AuthGuardError("FORBIDDEN", "Writer access is required.");
  }

  return user;
}

export async function requireEditor(): Promise<User> {
  const user = await requireSession();

  if (!isEditor(user)) {
    throw new AuthGuardError("FORBIDDEN", "Editor access is required.");
  }

  return user;
}

export async function requireAdmin(): Promise<User> {
  const user = await requireSession();

  if (!isAdmin(user)) {
    throw new AuthGuardError("FORBIDDEN", "Admin access is required.");
  }

  return user;
}

export async function requireSessionPage(redirectTo = BLOG_PAGE) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(redirectTo);
  }

  return user;
}

export async function requireWriterPage(redirectTo = BLOG_PAGE) {
  const user = await requireSessionPage(redirectTo);

  if (!isWriter(user)) {
    redirect(redirectTo);
  }

  return user;
}

export async function requireEditorPage(redirectTo = BLOG_PAGE) {
  const user = await requireSessionPage(redirectTo);

  if (!isEditor(user)) {
    redirect(redirectTo);
  }

  return user;
}

export async function requireAdminPage(redirectTo = BLOG_PAGE) {
  const user = await requireSessionPage(redirectTo);

  if (!isAdmin(user)) {
    redirect(redirectTo);
  }

  return user;
}

export function canUpdatePost(
  user: { id: string },
  post: { authorId: string },
) {
  return user.id === post.authorId;
}

export function canDeletePost(
  user: { id: string; role: UserRole },
  post: { authorId: string },
) {
  return user.id === post.authorId || isEditor(user);
}
