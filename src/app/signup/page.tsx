import { Rocket } from "lucide-react";
import Link from "next/link";
import SignupDauthButton from "./SignupDauthButton";

export default function SignupPage() {
  return (
    <main className="min-h-screen px-5 pb-20 pt-12 sm:px-8 lg:px-16">
      <section className="mx-auto max-w-xl border border-white/15 bg-black/80 p-6 text-center shadow-[0_0_60px_rgba(59,130,246,0.12)] sm:p-8">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center border border-blue-300/30 bg-blue-300/10 text-blue-100">
          <Rocket className="h-5 w-5" />
        </div>
        <h1 className="text-3xl font-bold">Sign up with DAuth</h1>
        <p className="mt-4 leading-7 text-white/70">
          Create an Orbit account with your NITT identity.
        </p>
        <SignupDauthButton />
        <Link
          href="/login"
          className="mt-3 inline-flex h-12 w-full items-center justify-center border border-white/15 px-5 font-semibold transition hover:border-white/40 hover:bg-white/10"
        >
          Back to login
        </Link>
      </section>
    </main>
  );
}
