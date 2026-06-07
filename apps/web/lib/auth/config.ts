import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@repo/db';
import bcrypt from 'bcryptjs';
import type { AuthOptions, DefaultSession } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { z } from 'zod';
import { getUserByEmail } from '../../lib/db/user';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      id: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
  }
}

export const nextAuthOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: 'jwt', // لازمه چون Credentials provider داریم
  },

  pages: {
    signIn: '/login',
    error: '/test', // خطاهای OAuth به login redirect میشن
  },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),

    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),

    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // ۱. Validate input با zod
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(8),
          })
          .safeParse(credentials);

        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // ۲. پیدا کردن user
        const user = await getUserByEmail(email);
        if (!user || !user.password) return null;

        // ۳. چک کردن email verification
        if (!user.emailVerified) {
          throw new Error('EMAIL_NOT_VERIFIED');
        }

        // ۴. چک کردن password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],

  callbacks: {
    // اضافه کردن user.id به JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    // اضافه کردن user.id به session
    async session({ session, token }) {
      if (token.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },

    // بعد از OAuth login، اگه email verify نشده بود redirect
    async signIn({ account }) {
      // OAuth providers همیشه مجاز هستن (Google/GitHub email رو verify میکنن)
      if (account?.type === 'oauth') return true;

      // برای credentials، authorize() خودش چک می‌کنه
      return true;
    },
  },
  events: {
    // بعد از OAuth، emailVerified رو set کن
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(nextAuthOptions);
