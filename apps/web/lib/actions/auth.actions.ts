'use server';

import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { signOut } from 'next-auth/react';
import { cookies } from 'next/headers';
import { z } from 'zod';
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
    email: z.email('آدرس ایمیل معتبر نیست'),
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
  email: z.email('آدرس ایمیل معتبر نیست'),
  password: z.string().min(1, 'رمز عبور الزامی است'),
});

const forgotPasswordSchema = z.object({
  email: z.email('آدرس ایمیل معتبر نیست'),
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

  const { name, email, password } = parsed.data;

  try {
    const existing = await getUserByEmail(email);
    if (existing) {
      return { success: false, error: 'این ایمیل قبلاً ثبت شده است' };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await createUser({ email, name, hashedPassword });

    const token = crypto.randomBytes(32).toString('hex');
    await upsertVerificationToken(email, token);
    await sendVerificationEmail(email, token);

    (await cookies()).set('registerEmail', email, {
      maxAge: 60 * 60 * 24,
    });

    return {
      success: true,
      message: 'Check your email for a verification link',
    };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: 'Something went wrong, please try again' };
  }
}

/**
 * ورود با email/password
 */
export async function loginAction(
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
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

  // چک کردن user و password در سرور
  const user = await getUserByEmail(email);
  if (!user || !user.password) {
    return { success: false, error: 'ایمیل یا رمز عبور اشتباه است' };
  }

  if (!user.emailVerified) {
    return {
      success: false,
      error: 'EMAIL_NOT_VERIFIED',
    };
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return { success: false, error: 'ایمیل یا رمز عبور اشتباه است' };
  }

  // اگه همه چیز درست بود، به client بگو signIn بزنه
  return { success: true };
}

/**
 * خروج از حساب
 */
export async function logoutAction() {
  await signOut({ redirect: true, callbackUrl: '/' });
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
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const email = formData.get('email') as string;

  const user = await getUserByEmail(email);

  // anti-enumeration
  if (!user) {
    return {
      success: true,
      message: 'If you have an account, check your email',
    };
  }

  if (user.emailVerified) {
    return {
      success: false,
      error: 'The email is already verified',
    };
  }

  try {
    const token = crypto.randomBytes(32).toString('hex');

    await upsertVerificationToken(email, token);

    await sendVerificationEmail(email, token);

    return {
      success: true,
      message: 'A new verification link has been sent',
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: 'Something went wrong',
    };
  }
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
