import { LockKeyhole } from "lucide-react";
import { redirect } from "next/navigation";
import { requireSessionPage } from "@/lib/auth-guards";
import {
  getPathWithTargetUri,
  getSafeRedirectPath,
  LOGIN_PAGE,
  TARGET_URI_PARAM,
} from "@/lib/auth-redirects";
import SetPasswordForm from "./SetPasswordForm";

type SetPasswordPageProps = {
  searchParams: Promise<{
    [TARGET_URI_PARAM]?: string | string[];
  }>;
};

export default async function SetPasswordPage({
  searchParams,
}: SetPasswordPageProps) {
  const params = await searchParams;
  const targetUri = getSafeRedirectPath(params[TARGET_URI_PARAM]);
  const user = await requireSessionPage(
    getPathWithTargetUri(LOGIN_PAGE, targetUri),
  );

  if (user.passwordSetAt) {
    redirect(targetUri);
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
        <SetPasswordForm targetUri={targetUri} />
      </section>
    </main>
  );
}
