import { clerkMiddleware } from "@clerk/nextjs/server";

// const isPublicRoute = createRouteMatcher(["/", "/api/webhook/clerk"]);

export default clerkMiddleware({
  afterSignUpUrl: "/",
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
