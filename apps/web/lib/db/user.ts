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
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 ساعت

  // اگه قبلاً token داشت، حذفش کن
  await prisma.verificationToken.deleteMany({
    where: { identifier: email },
  });

  return prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
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
