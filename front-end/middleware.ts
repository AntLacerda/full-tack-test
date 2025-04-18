import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/types/decoded-token";

const isProtectedAdminRoute = (pathname: string): boolean => {
    if(pathname === "/court/create") {
        return true;
    }

    const editCourtRegexId = /^\/court\/edit\/[^/]+$/;
    return editCourtRegexId.test(pathname);
}

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const pathname = request.nextUrl.pathname;

    const isAuthRoute = ["/login", "/signup", "/"].includes(pathname);

    if(token && isAuthRoute) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if(!token && !isAuthRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if(isProtectedAdminRoute(pathname)) {
        if(!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        try {
            const decodedToken: DecodedToken = jwtDecode(token);
            const role = decodedToken.role;

            if(role !== "admin") {
                return NextResponse.redirect(new URL("/dashboard", request.url));
            }
            
        } catch (error) {
            console.error("Erro ao verificar o token: ", error);
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }


    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|ttf|woff|woff2|eot|otf|css|js)).*)",
    ],
}