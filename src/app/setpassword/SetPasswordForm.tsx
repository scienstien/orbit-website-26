"use client";

import { ArrowRight, LockKeyhole } from "lucide-react";
import { useActionState } from "react";
import { setPasswordAction } from "@/app/setpassword/actions";
import { initialSetPasswordState } from "@/app/setpassword/state";
import { TARGET_URI_PARAM } from "@/lib/auth-redirects";

type SetPasswordFormProps = {
  targetUri: string;
};

export default function SetPasswordForm({ targetUri }: SetPasswordFormProps) {
  const [state, formAction, isPending] = useActionState(
    setPasswordAction,
    initialSetPasswordState,
  );

  return (
    <form action={formAction} className="mt-8 space-y-5 text-left">
      <input type="hidden" name={TARGET_URI_PARAM} value={targetUri} />

      <label className="block space-y-2">
        <span className="text-sm font-medium text-white/75">Password</span>
        <span className="flex h-12 items-center gap-3 border border-white/15 bg-white/5 px-4 transition focus-within:border-blue-300/60 focus-within:bg-white/10">
          <LockKeyhole className="h-4 w-4 text-blue-100" />
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            minLength={8}
            maxLength={128}
            required
            placeholder="Create a password"
            className="w-full bg-transparent font-mono text-sm text-white outline-none placeholder:text-white/35"
          />
        </span>
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-white/75">
          Confirm password
        </span>
        <span className="flex h-12 items-center gap-3 border border-white/15 bg-white/5 px-4 transition focus-within:border-blue-300/60 focus-within:bg-white/10">
          <LockKeyhole className="h-4 w-4 text-blue-100" />
          <input
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            minLength={8}
            maxLength={128}
            required
            placeholder="Confirm your password"
            className="w-full bg-transparent font-mono text-sm text-white outline-none placeholder:text-white/35"
          />
        </span>
      </label>

      {state.error ? (
        <p
          aria-live="polite"
          className="border border-red-300/30 bg-red-400/10 px-4 py-3 text-sm leading-6 text-red-100"
        >
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="group flex h-12 w-full items-center justify-center gap-2 border border-blue-300/30 bg-blue-300/10 px-5 font-mono font-semibold text-blue-50 transition hover:border-blue-200/70 hover:bg-blue-300/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Saving password..." : "Save password"}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </button>
    </form>
  );
}
