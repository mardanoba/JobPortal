// src/utils/testEmail.ts
import { sendEmail } from "./email.js";

(async () => {
  try {
    await sendEmail(
      "recipient@example.com",
      "Test Email from Job Portal",
      "This is a test email to verify SMTP setup."
    );
    console.log("Test email sent successfully!");
  } catch (err) {
    console.error("Email test failed:", err);
  }
})();
