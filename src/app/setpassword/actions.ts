"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getCurrentUser } from "@/lib/auth-guards";
import { db } from "../../../db";
import type { SetPasswordState } from "./state";

const BLOG_PAGE = "/blogpage";
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 128;

type RequestHeaders = Awaited<ReturnType<typeof headers>>;

function getErrorMessage(error: unknown) {
  if (!error || typeof error !== "object") {
    return "Unable to set your password. Please try again.";
  }

  if ("message" in error && typeof error.message === "string") {
    return error.message;
  }

  return "Unable to set your password. Please try again.";
}

async function markPasswordAsSet(userId: string) {
  await db.user.update({
    where: { id: userId },
    data: { passwordSetAt: new Date() },
  });
}

async function hasCredentialPassword(userId: string) {
  const account = await db.account.findFirst({
    where: {
      userId,
      providerId: "credential",
      password: { not: null },
    },
    select: { id: true },
  });

  return Boolean(account);
}

async function createPasswordSession(
  email: string,
  password: string,
  requestHeaders: RequestHeaders,
) {
  await auth.api.signInEmail({
    body: {
      callbackURL: BLOG_PAGE,
      email,
      password,
      rememberMe: true,
    },
    headers: requestHeaders,
  });
}

export async function setPasswordAction(
  _prevState: SetPasswordState,
  formData: FormData,
): Promise<SetPasswordState> {
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!password || !confirmPassword) {
    return { error: "Enter and confirm your password." };
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return { error: "Password must be at least 8 characters." };
  }

  if (password.length > MAX_PASSWORD_LENGTH) {
    return { error: "Password must be 128 characters or fewer." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const requestHeaders = await headers();
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Sign in again before setting a password." };
  }

  if (user.passwordSetAt) {
    redirect(BLOG_PAGE);
  }

  if (await hasCredentialPassword(user.id)) {
    try {
      await createPasswordSession(user.email, password, requestHeaders);
    } catch {
      return {
        error: "Password is already set. Sign in with your current password.",
      };
    }

    await markPasswordAsSet(user.id);
    redirect(BLOG_PAGE);
  }

  try {
    await auth.api.setPassword({
      body: { newPassword: password },
      headers: requestHeaders,
    });
  } catch (error) {
    if (await hasCredentialPassword(user.id)) {
      await markPasswordAsSet(user.id);
      redirect(BLOG_PAGE);
    }

    return { error: getErrorMessage(error) };
  }

  await markPasswordAsSet(user.id);
  await createPasswordSession(user.email, password, requestHeaders);
  redirect(BLOG_PAGE);
}
