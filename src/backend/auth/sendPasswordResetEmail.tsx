import { transporter } from '../utils/mailer';
import { render } from '@react-email/render';
import ResetPasswordEmail from '../../../emails/resetPassword';

export function sendPasswordResetEmail(token: string, email: string) {
  const emailHtml = render(<ResetPasswordEmail passwordResetToken={token} />);

  const data = {
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Passwort zurücksetzen',
    html: emailHtml,
  };

  transporter.sendMail(data, (err, info) => {
    if (err) {
      throw new Error(err.message);
    }
  });
}
