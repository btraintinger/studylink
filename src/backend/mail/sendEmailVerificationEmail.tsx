import { render } from '@react-email/render';
import EmailVerificationEmail from '../../../emails/emailVerification';
import { getMailTransporter, sendMail } from './mailer';

export async function sendEmailVerificationEmail(token: string, email: string) {
  const emailHtml = render(
    <EmailVerificationEmail verificationToken={token} />
  );

  const data = {
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Email Verifizierung',
    html: emailHtml,
  };

  await sendMail(data);
}
