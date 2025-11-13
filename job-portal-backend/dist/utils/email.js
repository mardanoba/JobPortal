// src/utils/email.ts
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false, // true if using port 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
export async function sendEmail(to, subject, text, html) {
    try {
        const info = await transporter.sendMail({
            from: `"Job Portal" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });
        console.log("Email sent:", info.messageId);
        return info;
    }
    catch (err) {
        console.error("Failed to send email:", err);
        throw err;
    }
}
//# sourceMappingURL=email.js.map