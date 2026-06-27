"use client";

import { ArrowRight, LockKeyhole, Mail, Rocket, UserPlus } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { signInWithDauth, signInWithPassword } from "@/lib/auth-utils";

type LoginFormProps = {
  authCallbackPath: string;
  loginErrorPath: string;
  signupPath: string;
};

function getAuthErrorMessage(result: unknown) {
  if (!result || typeof result !== "object" || !("error" in result)) {
    return null;
  }

  const error = result.error;

  if (!error || typeof error !== "object" || !("message" in error)) {
    return "Unable to sign in. Please try again.";
  }

  return typeof error.message === "string"
    ? error.message
    : "Unable to sign in. Please try again.";
}

export default function LoginForm({
  authCallbackPath,
  loginErrorPath,
  signupPath,
}: LoginFormProps) {
  const [authError, setAuthError] = useState<string | null>(null);
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);
  const [dauthSubmitting, setDauthSubmitting] = useState(false);
  const [rocketLaunching, setRocketLaunching] = useState(false);

  function previewDauthLaunch() {
    setRocketLaunching(false);
    requestAnimationFrame(() => setRocketLaunching(true));
  }

  async function handlePasswordSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError(null);
    setPasswordSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      setAuthError("Enter your NITT email and password.");
      setPasswordSubmitting(false);
      return;
    }

    try {
      const result = await signInWithPassword({
        callbackURL: authCallbackPath,
        email,
        password,
      });
      const errorMessage = getAuthErrorMessage(result);

      if (errorMessage) {
        setAuthError(errorMessage);
        setPasswordSubmitting(false);
      }
    } catch (error) {
      console.error("Password sign in failed", error);
      setAuthError("Unable to sign in. Please try again.");
      setPasswordSubmitting(false);
    }
  }

  async function handleDauthSignIn() {
    setAuthError(null);
    setDauthSubmitting(true);
    previewDauthLaunch();

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const result = await signInWithDauth({
        callbackURL: authCallbackPath,
        errorCallbackURL: loginErrorPath,
        newUserCallbackURL: authCallbackPath,
      });
      const errorMessage = getAuthErrorMessage(result);

      if (errorMessage) {
        setAuthError(errorMessage);
        setDauthSubmitting(false);
      }
    } catch (error) {
      console.error("DAuth sign in failed", error);
      setAuthError("Unable to start DAuth sign in. Please try again.");
      setDauthSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen px-5 pb-20 pt-12 font-mono sm:px-8 lg:px-16">
      <section className="mx-auto flex min-h-[72vh] max-w-4xl flex-col items-center justify-center gap-8 text-center">
        <div className="login-rise flex max-w-2xl flex-col items-center space-y-6">
          <div className="space-y-5">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Sign in to interact with posts.
            </h1>
            <p className="mx-auto max-w-xl text-base leading-7 text-white/70">
              Read the blog freely. Sign in when you want to like a post, leave
              a comment, or continue with your Orbit account.
            </p>
          </div>
        </div>

        <div className="login-rise login-rise-delay w-full max-w-xl border border-white/15 bg-black/80 p-5 text-left shadow-[0_0_60px_rgba(59,130,246,0.12)] sm:p-8">
          <form className="space-y-6 font-mono" onSubmit={handlePasswordSignIn}>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Login</h2>
              <p className="text-sm text-white/60">
                Enter your NITT email and password.
              </p>
            </div>

            <div className="space-y-4">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/75">Email</span>
                <span className="flex h-12 items-center gap-3 border border-white/15 bg-white/5 px-4 transition focus-within:border-blue-300/60 focus-within:bg-white/10">
                  <Mail className="h-4 w-4 text-blue-100" />
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="112124014@nitt.edu"
                    className="w-full bg-transparent font-mono text-sm text-white outline-none placeholder:text-white/35"
                  />
                </span>
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/75">
                  Password
                </span>
                <span className="flex h-12 items-center gap-3 border border-white/15 bg-white/5 px-4 transition focus-within:border-blue-300/60 focus-within:bg-white/10">
                  <LockKeyhole className="h-4 w-4 text-blue-100" />
                  <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    className="w-full bg-transparent font-mono text-sm text-white outline-none placeholder:text-white/35"
                  />
                </span>
              </label>
            </div>

            {authError ? (
              <p className="border border-red-300/30 bg-red-400/10 px-4 py-3 text-sm leading-6 text-red-100">
                {authError}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={passwordSubmitting || dauthSubmitting}
              className="group flex h-12 w-full items-center justify-center gap-2 border border-blue-300/30 bg-blue-300/10 px-5 font-mono font-semibold text-blue-50 transition hover:border-blue-200/70 hover:bg-blue-300/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {passwordSubmitting ? "Signing in..." : "Continue"}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>

            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/40">
              <span className="h-px flex-1 bg-white/15" />
              Or
              <span className="h-px flex-1 bg-white/15" />
            </div>

            <button
              type="button"
              onClick={handleDauthSignIn}
              disabled={passwordSubmitting || dauthSubmitting}
              className={`dauth-launch-button group flex h-12 w-full items-center justify-center gap-2 bg-white px-5 font-mono font-semibold text-black transition hover:bg-blue-100 ${
                rocketLaunching ? "dauth-launching" : ""
              } disabled:cursor-not-allowed disabled:opacity-70`}
            >
              <span
                className={`rocket-stage ${
                  rocketLaunching ? "rocket-stage-launching" : ""
                }`}
                onAnimationEnd={() => setRocketLaunching(false)}
              >
                <Rocket className="h-4 w-4" />
              </span>
              {dauthSubmitting ? "Opening DAuth..." : "Continue with DAuth"}
            </button>

            <Link
              href={signupPath}
              className="flex h-12 w-full items-center justify-center gap-2 border border-white/15 px-5 font-mono font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              <UserPlus className="h-4 w-4" />
              New user? Sign up with DAuth
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
}
