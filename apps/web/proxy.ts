// import type { NextRequestWithAuth } from 'next-auth/middleware';
// import { withAuth } from 'next-auth/middleware';
// import { NextResponse } from 'next/server';

import { NextRequest, NextResponse } from 'next/server';

// const protectedRoutes = ['/dashboard', '/analysis'];
// const authRoutes = ['/login', '/register'];

// export default withAuth(function middleware(req: NextRequestWithAuth) {
//   const { nextUrl } = req;

//   const token = req.nextauth.token;
//   const isLoggedIn = !!token;

//   const path = nextUrl.pathname;

//   const isProtected = protectedRoutes.some((r) => path.startsWith(r));

//   console.log(isProtected);
//   console.log(isLoggedIn);

//   if (isProtected && !isLoggedIn) {
//     const loginUrl = new URL('/login', nextUrl);
//     loginUrl.searchParams.set('callbackUrl', path);
//     return NextResponse.redirect(loginUrl);
//   }

//   const isAuthRoute = authRoutes.some((r) => path.startsWith(r));

//   if (isAuthRoute && isLoggedIn) {
//     return NextResponse.redirect(new URL('/dashboard', nextUrl));
//   }

//   return NextResponse.next();
// });

export default function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
