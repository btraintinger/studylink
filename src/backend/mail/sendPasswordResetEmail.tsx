import { render } from '@react-email/render';
import ResetPasswordEmail from '../../../emails/resetPassword';
import { sendMail } from './mailer';

export async function sendPasswordResetEmail(token: string, email: string) {
  const emailHtml = render(<ResetPasswordEmail passwordResetToken={token} />);

  const data = {
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Passwort zurücksetzen',
    html: emailHtml,
  };

  await sendMail(data);
}
