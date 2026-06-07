import { verifyEmailAction } from '@/lib/actions/auth.actions';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/auth/verify-email?token=xxx
 * لینکی که در ایمیل تایید ارسال میشه
 */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(
      new URL('/login?error=invalid_token', req.url),
    );
  }

  const result = await verifyEmailAction(token);

  if (!result.success) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(result.error)}`, req.url),
    );
  }

  // موفق — به login با پیام success
  return NextResponse.redirect(new URL('/login?verified=true', req.url));
}
