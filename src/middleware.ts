import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// หน้าที่ต้อง login ก่อนถึงจะเข้าได้
const PROTECTED_PATHS = [
  '/dashboard',
  '/book-company',
  '/admin',
  '/blog/create',
  '/company',
];

// หน้าที่ login แล้วไม่ควรกลับเข้า
const AUTH_PATHS = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('jf_token')?.value;

  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PATHS.some((p) => pathname.startsWith(p));

  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
