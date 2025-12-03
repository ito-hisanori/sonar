import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt_token")?.value;
  const pathname = request.nextUrl.pathname;
  const isPrivateRoute = pathname.startsWith("/user");
  // || pathname.startsWith("/admin")

  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL("/?formType=login", request.url));
  }

  // const role = request.cookies.get("role")?.value;
  // if (isPrivateRoute && token && role) {
  //   return NextResponse.redirect(new URL(`/${role}dashboard`, request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
