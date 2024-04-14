import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  adminRoutes,
} from "@/routes";
import { GetUserRole } from "./actions/get-user-role";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;


  // ! This is the middleware that checks if the user is an admin or not, and redirects them to the login page if they are not an admin 

  // ? Only allow admins to access Dashboard and Admin routes

  try {
    const role = await GetUserRole();
    console.log("User role:", role);

    const isAdmin = role === "ADMIN";

    const isAdminRoute =
      adminRoutes.includes(nextUrl.pathname) ||
      nextUrl.pathname.startsWith("/dashboard");

    if (!isAdmin && isAdminRoute) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
  } catch (error) {
    return ;
  }

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return; // Allow API authentication routes to pass through
  }

  if (!isLoggedIn && !isPublicRoute && nextUrl.pathname !== "/auth/login") {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      // Redirect to login if not logged in
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)); // Redirect logged-in users to default redirect path
  }

  return; // Do nothing for other cases
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
