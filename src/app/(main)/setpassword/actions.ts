"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { getCurrentUser } from "@/lib/auth-guards";
import { getSafeRedirectPath, TARGET_URI_PARAM } from "@/lib/auth-redirects";
import { db } from "../../../../db";
import type { SetPasswordState } from "./state";

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 128;

const setPasswordSchema = z
  .object({
    password: z
      .string({ error: "Enter and confirm your password." })
      .min(1, "Enter and confirm your password.")
      .min(MIN_PASSWORD_LENGTH, "Password must be at least 8 characters.")
      .max(MAX_PASSWORD_LENGTH, "Password must be 128 characters or fewer."),
    confirmPassword: z
      .string({ error: "Enter and confirm your password." })
      .min(1, "Enter and confirm your password."),
    [TARGET_URI_PARAM]: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

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
  callbackURL: string,
) {
  await auth.api.signInEmail({
    body: {
      callbackURL,
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
  const parsedFields = setPasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    [TARGET_URI_PARAM]: formData.get(TARGET_URI_PARAM) ?? undefined,
  });

  if (!parsedFields.success) {
    return {
      error:
        parsedFields.error.issues[0]?.message ??
        "Unable to set your password. Please try again.",
    };
  }

  const { password } = parsedFields.data;
  const targetUri = getSafeRedirectPath(parsedFields.data[TARGET_URI_PARAM]);
  const requestHeaders = await headers();
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Sign in again before setting a password." };
  }

  if (user.passwordSetAt) {
    redirect(targetUri);
  }

  if (await hasCredentialPassword(user.id)) {
    try {
      await createPasswordSession(
        user.email,
        password,
        requestHeaders,
        targetUri,
      );
    } catch {
      return {
        error: "Password is already set. Sign in with your current password.",
      };
    }

    await markPasswordAsSet(user.id);
    redirect(targetUri);
  }

  try {
    await auth.api.setPassword({
      body: { newPassword: password },
      headers: requestHeaders,
    });
  } catch (error) {
    if (await hasCredentialPassword(user.id)) {
      await markPasswordAsSet(user.id);
      redirect(targetUri);
    }

    return { error: getErrorMessage(error) };
  }

  await markPasswordAsSet(user.id);
  await createPasswordSession(user.email, password, requestHeaders, targetUri);
  redirect(targetUri);
}
