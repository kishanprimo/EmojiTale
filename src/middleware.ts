import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token =
        request.cookies.get("emotale_admin_token")?.value;

    console.log("========== MIDDLEWARE ==========");
    console.log("PATH :", pathname);
    console.log("TOKEN :", token);
    const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

    if (!token && !isPublic) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token && isPublic) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|Login|.*\\.(?:png|jpg|jpeg|svg|ico|webp)$).*)"],
};
