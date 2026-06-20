import { UserRole } from "@/generated/prisma/enums";

export const BLOG_PAGE = "/blogpage";
export const LOGIN_PAGE = "/login";
export const SET_PASSWORD_PAGE = "/setpassword";

export function getPostLoginRedirectPath(user: { role: UserRole }) {
  switch (user.role) {
    case UserRole.USER:
      return BLOG_PAGE;
    default:
      return BLOG_PAGE;
  }
}
