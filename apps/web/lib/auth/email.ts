import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * ارسال ایمیل تایید آدرس
 */
export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"CritiqAI" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'آدرس ایمیل خود را تایید کنید',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>تایید آدرس ایمیل</h2>
        <p>برای تکمیل ثبت‌نام، روی لینک زیر کلیک کنید:</p>
        <a
          href="${verifyUrl}"
          style="
            display: inline-block;
            background: #7c6df0;
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            text-decoration: none;
            margin: 16px 0;
          "
        >
          تایید ایمیل
        </a>
        <p style="color: #666; font-size: 14px;">
          این لینک تا ۲۴ ساعت معتبر است.<br/>
          اگر این درخواست از شما نیست، این ایمیل را نادیده بگیرید.
        </p>
      </div>
    `,
  });
}

/**
 * ارسال ایمیل reset password
 */
export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"CritiqAI" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'بازیابی رمز عبور',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>بازیابی رمز عبور</h2>
        <p>برای تغییر رمز عبور روی لینک زیر کلیک کنید:</p>
        <a
          href="${resetUrl}"
          style="
            display: inline-block;
            background: #7c6df0;
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            text-decoration: none;
            margin: 16px 0;
          "
        >
          تغییر رمز عبور
        </a>
        <p style="color: #666; font-size: 14px;">
          این لینک تا ۱ ساعت معتبر است.<br/>
          اگر این درخواست از شما نیست، رمز عبورتان در امنیت است.
        </p>
      </div>
    `,
  });
}
