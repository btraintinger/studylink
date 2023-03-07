import { render } from '@react-email/render';
import ResetPasswordEmail from '../../../emails/resetPassword';
import { getMailTransporter } from './mailer';

export function sendPasswordResetEmail(token: string, email: string) {
  const emailHtml = render(<ResetPasswordEmail passwordResetToken={token} />);

  const data = {
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Passwort zurücksetzen',
    html: emailHtml,
  };

  const transporter = getMailTransporter();
  transporter.sendMail(data, (err) => {
    if (err) {
      throw new Error(err.message);
    }
  });
  transporter.close();
}
