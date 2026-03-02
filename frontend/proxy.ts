import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Only "/" is accessible without sign-in
const isPublicRoute = createRouteMatcher(["/"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  console.log(
    `[Proxy] Path: ${req.nextUrl.pathname} | User: ${userId ? "LOGGED IN" : "LOGGED OUT"} | Public: ${isPublicRoute(req)}`,
  );

  if (!isPublicRoute(req) && !userId) {
    const homeUrl = new URL("/", req.url);
    homeUrl.searchParams.set("auth", "required");
    return NextResponse.redirect(homeUrl);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
