import { redirect } from "next/navigation";
import { requireSessionPage } from "@/lib/auth-guards";
import {
  getPathWithTargetUri,
  getPostLoginRedirectPath,
  getSafeRedirectPath,
  LOGIN_PAGE,
  SET_PASSWORD_PAGE,
  TARGET_URI_PARAM,
} from "@/lib/auth-redirects";

type AuthRedirectPageProps = {
  searchParams: Promise<{
    [TARGET_URI_PARAM]?: string | string[];
  }>;
};

export default async function AuthRedirectPage({
  searchParams,
}: AuthRedirectPageProps) {
  const params = await searchParams;
  const targetUri = getSafeRedirectPath(params[TARGET_URI_PARAM]);
  const user = await requireSessionPage(
    getPathWithTargetUri(LOGIN_PAGE, targetUri),
  );

  if (!user.passwordSetAt) {
    redirect(getPathWithTargetUri(SET_PASSWORD_PAGE, targetUri));
  }

  redirect(getSafeRedirectPath(targetUri, getPostLoginRedirectPath(user)));
}
