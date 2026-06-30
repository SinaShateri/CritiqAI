import PAGES from '@repo/constants/pages';
import { redirect } from 'next/navigation';
import { auth } from '../../lib/auth/config';

/**
 * Session رو برمیگردونه، اگه نبود null
 * برای Server Components و Route Handlers
 */
export async function getSession() {
  return await auth();
}

/**
 * User فعلی رو برمیگردونه، اگه نبود null
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user ?? null;
}

/**
 * اگه لاگین نبود به /login redirect میکنه
 * برای protected Server Components
 */
export async function requireAuth() {
  const session = await getSession();

  if (!session?.user) {
    redirect('/login');
  }

  return session.user;
}

/**
 * اگه لاگین بود به /dashboard redirect میکنه
 * برای صفحات login/register
 */
export async function requireGuest() {
  const session = await getSession();

  if (session?.user) {
    redirect(PAGES.dashboard.index);
  }
}
