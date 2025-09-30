import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Regex for static files that should be cached
const STATIC_FILE_REGEX = /\.(jpg|jpeg|png|webp|avif|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|css|js)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Add caching headers for static assets
  if (STATIC_FILE_REGEX.test(pathname)) {
    // Cache for 1 year (31536000 seconds)
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    
    // Add Vercel-specific headers to optimize edge caching
    response.headers.set('CDN-Cache-Control', 'public, max-age=31536000, immutable');
    response.headers.set('Vercel-CDN-Cache-Control', 'public, max-age=31536000, immutable');
  }

  return response;
}

export const config = {
  matcher: [
    // Match all static files
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};