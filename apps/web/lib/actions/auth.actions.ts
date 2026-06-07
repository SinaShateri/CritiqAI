'use server';

import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { z } from 'zod';
import { signIn, signOut } from '../../lib/auth/config';
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from '../../lib/auth/email';
import {
  createUser,
  deleteVerificationToken,
  getUserByEmail,
  getVerificationToken,
  updateUserPassword,
  upsertVerificationToken,
  verifyUserEmail,
} from '../../lib/db/user';

// ─── Types ────────────────────────────────────────────────────────────────

export type ActionResult<T = void> =
  | { success: true; data?: T; message?: string }
  | { success: false; error: string };

// ─── Schemas ──────────────────────────────────────────────────────────────

const registerSchema = z
  .object({
    name: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
    email: z.string().email('آدرس ایمیل معتبر نیست'),
    password: z
      .string()
      .min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد')
      .regex(/[A-Z]/, 'رمز عبور باید شامل یک حرف بزرگ باشد')
      .regex(/[0-9]/, 'رمز عبور باید شامل یک عدد باشد'),

    confirm: z.string().min(1, 'تکرار رمز عبور الزامی است'),
  })
  .superRefine(({ password, confirm }, ctx) => {
    if (password !== confirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'رمز عبور همخوانی ندارد',
        path: ['confirm'],
      });
    }
  });

const loginSchema = z.object({
  email: z.string().email('آدرس ایمیل معتبر نیست'),
  password: z.string().min(1, 'رمز عبور الزامی است'),
});

const forgotPasswordSchema = z.object({
  email: z.string().email('آدرس ایمیل معتبر نیست'),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z
    .string()
    .min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد')
    .regex(/[A-Z]/, 'رمز عبور باید شامل یک حرف بزرگ باشد')
    .regex(/[0-9]/, 'رمز عبور باید شامل یک عدد باشد'),
});

// ─── Actions ──────────────────────────────────────────────────────────────

/**
 * ثبت‌نام با email/password
 */
export async function registerAction(
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  // ۱. Validate
  const parsed = registerSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm: formData.get('confirm'),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? 'Invalid form data',
    };
  }

  const { name, email, password, confirm } = parsed.data;

  // ۲. چک کن user وجود نداره
  const existing = await getUserByEmail(email);
  if (existing) {
    return { success: false, error: 'این ایمیل قبلاً ثبت شده است' };
  }

  // ۳. Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // ۴. ساخت user
  await createUser({ email, name, hashedPassword });

  // ۵. ساخت و ارسال verification token
  const token = crypto.randomBytes(32).toString('hex');
  await upsertVerificationToken(email, token);
  await sendVerificationEmail(email, token);

  return {
    success: true,
    message: 'ثبت‌نام موفق! لطفاً ایمیل خود را تایید کنید.',
  };
}

/**
 * ورود با email/password
 */
export async function loginAction(formData: FormData): Promise<ActionResult> {
  // ۱. Validate
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? 'Invalid form data',
    };
  }

  const { email, password } = parsed.data;

  // ۲. signIn از NextAuth
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      // خطای custom که از authorize() throw شده
      if (error.message.includes('EMAIL_NOT_VERIFIED')) {
        return {
          success: false,
          error: 'ایمیل شما تایید نشده است. لطفاً ایمیل خود را بررسی کنید.',
        };
      }
      return { success: false, error: 'ایمیل یا رمز عبور اشتباه است' };
    }
    throw error;
  }
}

/**
 * ورود با Google OAuth
 */
export async function loginWithGoogleAction() {
  await signIn('google', { redirectTo: '/dashboard' });
}

/**
 * ورود با GitHub OAuth
 */
export async function loginWithGithubAction() {
  await signIn('github', { redirectTo: '/dashboard' });
}

/**
 * خروج از حساب
 */
export async function logoutAction() {
  await signOut({ redirectTo: '/login' });
}

/**
 * تایید ایمیل با token
 * از route handler /api/auth/verify-email صدا زده میشه
 */
export async function verifyEmailAction(token: string): Promise<ActionResult> {
  // ۱. پیدا کردن token
  const verificationToken = await getVerificationToken(token);

  if (!verificationToken) {
    return { success: false, error: 'لینک تایید معتبر نیست' };
  }

  // ۲. چک کردن انقضا
  if (verificationToken.expires < new Date()) {
    await deleteVerificationToken(token);
    return { success: false, error: 'لینک تایید منقضی شده است' };
  }

  // ۳. تایید ایمیل user
  await verifyUserEmail(verificationToken.identifier);

  // ۴. حذف token
  await deleteVerificationToken(token);

  return { success: true, message: 'ایمیل شما با موفقیت تایید شد' };
}

/**
 * ارسال مجدد ایمیل تایید
 */
export async function resendVerificationEmailAction(
  email: string,
): Promise<ActionResult> {
  const user = await getUserByEmail(email);

  if (!user) {
    // عمداً همان پیام موفق رو نمایش میدیم (security)
    return { success: true, message: 'اگر ایمیل موجود باشد، لینک ارسال شد' };
  }

  if (user.emailVerified) {
    return { success: false, error: 'این ایمیل قبلاً تایید شده است' };
  }

  const token = crypto.randomBytes(32).toString('hex');
  await upsertVerificationToken(email, token);
  await sendVerificationEmail(email, token);

  return { success: true, message: 'ایمیل تایید مجدداً ارسال شد' };
}

/**
 * درخواست reset password
 */
export async function forgotPasswordAction(
  formData: FormData,
): Promise<ActionResult> {
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get('email'),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.message };
  }

  const { email } = parsed.data;

  // همیشه موفق نمایش بده (security - از enumeration جلوگیری میکنه)
  const user = await getUserByEmail(email);
  if (!user || !user.password) {
    return { success: true, message: 'اگر ایمیل موجود باشد، لینک ارسال شد' };
  }

  const token = crypto.randomBytes(32).toString('hex');
  await upsertVerificationToken(email, token);
  await sendPasswordResetEmail(email, token);

  return {
    success: true,
    message: 'لینک بازیابی رمز عبور به ایمیل شما ارسال شد',
  };
}

/**
 * تغییر رمز عبور با token
 */
export async function resetPasswordAction(
  formData: FormData,
): Promise<ActionResult> {
  const parsed = resetPasswordSchema.safeParse({
    token: formData.get('token'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.message };
  }

  const { token, password } = parsed.data;

  // ۱. چک token
  const verificationToken = await getVerificationToken(token);
  if (!verificationToken) {
    return { success: false, error: 'لینک بازیابی معتبر نیست' };
  }

  if (verificationToken.expires < new Date()) {
    await deleteVerificationToken(token);
    return { success: false, error: 'لینک بازیابی منقضی شده است' };
  }

  // ۲. آپدیت password
  const hashedPassword = await bcrypt.hash(password, 12);
  await updateUserPassword(verificationToken.identifier, hashedPassword);

  // ۳. حذف token
  await deleteVerificationToken(token);

  return { success: true, message: 'رمز عبور با موفقیت تغییر کرد' };
}
