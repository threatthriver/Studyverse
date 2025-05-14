import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // For simplicity, we'll just check if the user has a session cookie
  // In a real app, you would validate the session token
  const hasSession = request.cookies.has('studyverse_session');
  
  // Public paths that don't require authentication
  const publicPaths = ['/', '/login'];
  
  // Check if the current path is a public path
  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname === path || 
    request.nextUrl.pathname.startsWith('/api/')
  );
  
  // If the user is not logged in and trying to access a protected route
  if (!hasSession && !isPublicPath) {
    // Redirect to the login page
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  // If the user is logged in and trying to access the login page
  if (hasSession && request.nextUrl.pathname === '/login') {
    // Redirect to the study page
    const studyUrl = new URL('/study', request.url);
    return NextResponse.redirect(studyUrl);
  }
  
  // Continue with the request
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (public images)
     * - fonts/ (public fonts)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|fonts).*)',
  ],
};
