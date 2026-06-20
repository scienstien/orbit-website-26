"use client";

import { authClient } from "./auth-client";

export const DAUTH_PROVIDER_ID = "dauth" as const;
export const AUTH_REDIRECT_PATH = "/auth/redirect" as const;
export const AUTH_ERROR_PATH = "/login" as const;

export type AuthRedirectOptions = {
  callbackURL?: string;
  errorCallbackURL?: string;
  newUserCallbackURL?: string;
  disableRedirect?: boolean;
};

export type PasswordSignInOptions = {
  email: string;
  password: string;
  callbackURL?: string;
  rememberMe?: boolean;
};

export function signInWithDauth({
  callbackURL = AUTH_REDIRECT_PATH,
  errorCallbackURL = AUTH_ERROR_PATH,
  newUserCallbackURL = AUTH_REDIRECT_PATH,
  disableRedirect,
}: AuthRedirectOptions = {}) {
  return authClient.signIn.oauth2({
    providerId: DAUTH_PROVIDER_ID,
    callbackURL,
    errorCallbackURL,
    newUserCallbackURL,
    disableRedirect,
  });
}

export function signUpWithDauth({
  callbackURL = AUTH_REDIRECT_PATH,
  errorCallbackURL = AUTH_ERROR_PATH,
  newUserCallbackURL = AUTH_REDIRECT_PATH,
  disableRedirect,
}: AuthRedirectOptions = {}) {
  return authClient.signIn.oauth2({
    providerId: DAUTH_PROVIDER_ID,
    callbackURL,
    errorCallbackURL,
    newUserCallbackURL,
    disableRedirect,
    requestSignUp: true,
  });
}

export function signInWithPassword({
  email,
  password,
  callbackURL = AUTH_REDIRECT_PATH,
  rememberMe = true,
}: PasswordSignInOptions) {
  return authClient.signIn.email({
    email,
    password,
    callbackURL,
    rememberMe,
  });
}

export function signOut() {
  return authClient.signOut();
}
