"use client";

import { Rocket } from "lucide-react";
import { useState } from "react";
import { signUpWithDauth } from "@/lib/auth-utils";

type SignupDauthButtonProps = {
  authCallbackPath: string;
  signupErrorPath: string;
};

function getAuthErrorMessage(result: unknown) {
  if (!result || typeof result !== "object" || !("error" in result)) {
    return null;
  }

  const error = result.error;

  if (!error || typeof error !== "object" || !("message" in error)) {
    return "Unable to start DAuth sign up. Please try again.";
  }

  return typeof error.message === "string"
    ? error.message
    : "Unable to start DAuth sign up. Please try again.";
}

export default function SignupDauthButton({
  authCallbackPath,
  signupErrorPath,
}: SignupDauthButtonProps) {
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rocketLaunching, setRocketLaunching] = useState(false);

  function previewDauthLaunch() {
    setRocketLaunching(false);
    requestAnimationFrame(() => setRocketLaunching(true));
  }

  async function handleDauthSignUp() {
    setAuthError(null);
    setIsSubmitting(true);
    previewDauthLaunch();

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const result = await signUpWithDauth({
        callbackURL: authCallbackPath,
        errorCallbackURL: signupErrorPath,
        newUserCallbackURL: authCallbackPath,
      });
      const errorMessage = getAuthErrorMessage(result);

      if (errorMessage) {
        setAuthError(errorMessage);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("DAuth sign up failed", error);
      setAuthError("Unable to start DAuth sign up. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-8 space-y-4">
      {authError ? (
        <p className="border border-red-300/30 bg-red-400/10 px-4 py-3 text-left text-sm leading-6 text-red-100">
          {authError}
        </p>
      ) : null}

      <button
        type="button"
        onClick={handleDauthSignUp}
        disabled={isSubmitting}
        className={`dauth-launch-button group flex h-12 w-full items-center justify-center gap-2 border border-blue-300/30 bg-blue-300/10 px-5 font-semibold text-blue-50 transition hover:border-blue-200/70 hover:bg-blue-300/20 disabled:cursor-not-allowed disabled:opacity-70 ${
          rocketLaunching ? "dauth-launching" : ""
        }`}
      >
        <span
          className={`rocket-stage ${
            rocketLaunching ? "rocket-stage-launching" : ""
          }`}
          onAnimationEnd={() => setRocketLaunching(false)}
        >
          <Rocket className="h-4 w-4" />
        </span>
        {isSubmitting ? "Opening DAuth..." : "Continue with DAuth"}
      </button>
    </div>
  );
}
