import NUMBER from '@repo/constants/number';
import { prisma } from '@repo/db';

/**
 * پیدا کردن user با email
 */
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

/**
 * پیدا کردن user با id
 */
export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}

/**
 * ساخت user جدید با email/password
 */
export async function createUser(data: {
  email: string;
  name: string;
  hashedPassword: string;
}) {
  return prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: data.hashedPassword,
      // emailVerified عمداً null میمونه تا ایمیل verify بشه
    },
  });
}

/**
 * تایید ایمیل کاربر
 */
export async function verifyUserEmail(email: string) {
  return prisma.user.update({
    where: { email },
    data: { emailVerified: new Date() },
  });
}

/**
 * آپدیت کردن پسورد (برای reset password)
 */
export async function updateUserPassword(
  email: string,
  hashedPassword: string,
) {
  return prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });
}

// ─── Verification Token queries ───────────────────────────────────────────

/**
 * ساخت یا جایگزینی verification token
 */
export async function upsertVerificationToken(email: string, token: string) {
  const now = new Date();

  // ─────────────────────────────────────────
  // Rate limit record
  // ─────────────────────────────────────────

  let rateLimit = await prisma.verificationRateLimit.findUnique({
    where: {
      identifier: email,
    },
  });

  // ─────────────────────────────────────────
  // Existing limiter
  // ─────────────────────────────────────────

  if (rateLimit) {
    // check if blocked
    if (rateLimit.blockedUntil && now < rateLimit.blockedUntil) {
      const remainingSeconds = Math.ceil(
        (rateLimit.blockedUntil.getTime() - now.getTime()) / 1000,
      );

      throw new Error(
        `Please wait ${remainingSeconds} seconds before requesting another email.`,
      );
    }

    // exponential backoff
    const delayMinutes = Math.min(
      NUMBER.BASE_VERIFY_TOKEN_DELAY_MINUTES * 2 ** (rateLimit.attempts - 1),
      NUMBER.MAX_VERIFY_TOKEN_DELAY_MINUTES,
    );

    const blockedUntil = new Date(now.getTime() + delayMinutes * 60 * 1000);

    // update limiter
    rateLimit = await prisma.verificationRateLimit.update({
      where: {
        identifier: email,
      },
      data: {
        attempts: {
          increment: 1,
        },
        blockedUntil,
        lastAttemptAt: now,
      },
    });
  } else {
    // first request
    rateLimit = await prisma.verificationRateLimit.create({
      data: {
        identifier: email,
        attempts: 1,
        blockedUntil: new Date(
          now.getTime() + NUMBER.BASE_VERIFY_TOKEN_DELAY_MINUTES * 60 * 1000,
        ),
      },
    });
  }

  // ─────────────────────────────────────────
  // Remove previous tokens
  // ─────────────────────────────────────────

  await prisma.verificationToken.deleteMany({
    where: {
      identifier: email,
    },
  });

  // ─────────────────────────────────────────
  // Create fresh token
  // ─────────────────────────────────────────

  return prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires: new Date(now.getTime() + 24 * 60 * 60 * 1000),
    },
  });
}

/**
 * پیدا کردن token برای verify
 */
export async function getVerificationToken(token: string) {
  return prisma.verificationToken.findUnique({
    where: { token },
  });
}

/**
 * حذف token بعد از استفاده
 */
export async function deleteVerificationToken(token: string) {
  return prisma.verificationToken.delete({
    where: { token },
  });
}
