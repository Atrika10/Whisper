import { resend } from "../lib/resend";
import VerificationEmail from "@/emails/verificationEmail";
import { ApiResponse } from "@/src/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    console.log(`Sending verification email to: ${email}`);
    await resend.emails.send({
      // For testing, use the default Resend address.
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Whisper Message Verification Code',
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}