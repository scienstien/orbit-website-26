import {
  AUTH_REDIRECT_PAGE,
  getPathWithTargetUri,
  getSafeRedirectPath,
  LOGIN_PAGE,
  SIGNUP_PAGE,
  TARGET_URI_PARAM,
} from "@/lib/auth-redirects";
import LoginForm from "./LoginForm";

type LoginPageProps = {
  searchParams: Promise<{
    [TARGET_URI_PARAM]?: string | string[];
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const targetUri = getSafeRedirectPath(params[TARGET_URI_PARAM]);

  return (
    <LoginForm
      authCallbackPath={getPathWithTargetUri(AUTH_REDIRECT_PAGE, targetUri)}
      loginErrorPath={getPathWithTargetUri(LOGIN_PAGE, targetUri)}
      signupPath={getPathWithTargetUri(SIGNUP_PAGE, targetUri)}
    />
  );
}
