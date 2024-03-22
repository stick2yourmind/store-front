import { adminRoute } from '@/config/role.config';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();
  let roleCookie = request.cookies.get('role');
  const decodedRoleCookie = decodeURIComponent(roleCookie?.value || '[]');
  const role = JSON.parse(decodedRoleCookie);

  if (adminRoute.includes(pathname)) {
    if (!role.includes('ADMIN')) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  const response = NextResponse.next();
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api-next|_next/static|_next/image|favicon.ico).*)',
  ],
};
