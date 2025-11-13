// src/utils/email.ts
import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// Use Gmail SMTP (recommended for testing)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export async function sendEmail(
  to: string,
  subject: string,
  text: string,
  html?: string
) {
  try {
    const info = await transporter.sendMail({
      from: `"Job Portal" <${EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (err: any) {
    console.error("❌ Failed to send email:", err.message);
    throw new Error("Could not send email. Please check your SMTP settings.");
  }
}
