import PAGES from '@repo/constants/pages';
import { prisma } from '@repo/db';
import { redirect } from 'next/navigation';
import { auth } from '../../lib/auth/config';

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function requireUser(id?: string) {
  if (!id) throw new Error('Not authenticated');
  const user = await getUserById(id);
  if (!user) throw new Error('User not found');
  return user;
}

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
    redirect(PAGES.dashboard.overview);
  }
}
