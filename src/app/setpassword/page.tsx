import { LockKeyhole } from "lucide-react";
import { redirect } from "next/navigation";
import { requireSessionPage } from "@/lib/auth-guards";
import SetPasswordForm from "./SetPasswordForm";

const BLOG_PAGE = "/blogpage";

export default async function SetPasswordPage() {
  const user = await requireSessionPage("/login");

  if (user.passwordSetAt) {
    redirect(BLOG_PAGE);
  }

  return (
    <main className="min-h-screen px-5 pb-20 pt-12 font-mono sm:px-8 lg:px-16">
      <section className="mx-auto max-w-xl border border-white/15 bg-black/80 p-6 text-center shadow-[0_0_60px_rgba(59,130,246,0.12)] sm:p-8">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center border border-blue-300/30 bg-blue-300/10 text-blue-100">
          <LockKeyhole className="h-5 w-5" />
        </div>
        <h1 className="text-3xl font-bold">Set your password</h1>
        <p className="mt-4 leading-7 text-white/70">
          Create your Orbit password before password login is enabled for your
          account.
        </p>
        <SetPasswordForm />
      </section>
    </main>
  );
}
