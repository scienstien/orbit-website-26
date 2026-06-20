import { redirect } from "next/navigation";
import { requireSessionPage } from "@/lib/auth-guards";
import {
  getPostLoginRedirectPath,
  LOGIN_PAGE,
  SET_PASSWORD_PAGE,
} from "@/lib/auth-redirects";

export default async function AuthRedirectPage() {
  const user = await requireSessionPage(LOGIN_PAGE);

  if (!user.passwordSetAt) {
    redirect(SET_PASSWORD_PAGE);
  }

  redirect(getPostLoginRedirectPath(user));
}
