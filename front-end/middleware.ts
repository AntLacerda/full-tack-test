import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    const isAuthRoute = ["/login", "/signup", "/"].includes(request.nextUrl.pathname);

    if(token && isAuthRoute) {
        return NextResponse.redirect(new URL("/home", request.url));
    }

    if(!token && !isAuthRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
      "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|ttf|woff|woff2|eot|otf|css|js)).*)"
    ]
}