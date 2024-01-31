import { NextResponse, type NextRequest } from "next/server";
import { existUser, getUser } from "./lib/utilsServer";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const thereIsUser = existUser();

  const path = request.nextUrl.pathname;

  if(!thereIsUser && path !== "/sign-in") {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if(thereIsUser && path === "/sign-in") {
    return NextResponse.redirect(new URL("/loans", request.url));
  }

}

export const config = {
  matcher: ["/loans", "/sign-in"],
};
