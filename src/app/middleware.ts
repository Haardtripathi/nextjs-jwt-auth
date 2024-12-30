import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// Define protected and unauthenticated routes
const PROTECTED_ROUTES = ['/dashboard', '/profile', '/settings', '/'];
const UNAUTHENTICATED_ROUTES = ['/login', '/register', '/'];

export async function middleware(request: NextRequest) {
    const token = request.headers.get('authorization')?.split(' ')[1];
    const url = request.nextUrl;

    try {
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET!);

            // Redirect authenticated users away from unauthenticated routes
            if (UNAUTHENTICATED_ROUTES.some((path) => url.pathname.startsWith(path))) {
                return NextResponse.redirect(new URL('/', url));
            }
        } else {
            // Redirect unauthenticated users trying to access protected routes
            if (PROTECTED_ROUTES.some((path) => url.pathname.startsWith(path))) {
                return NextResponse.redirect(new URL('/login', url));
            }
        }
    } catch {
        if (PROTECTED_ROUTES.some((path) => url.pathname.startsWith(path))) {
            return NextResponse.redirect(new URL('/login', url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [...PROTECTED_ROUTES.map((route) => `${route}/:path*`), ...UNAUTHENTICATED_ROUTES],
};
