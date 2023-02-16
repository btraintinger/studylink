import { transporter } from '../utils/mailer';
import { render } from '@react-email/render';
import EmailVerificationEmail from '../../../emails/emailVerification';

export function sendEmailVerificationEmail(token: string, email: string) {
  const emailHtml = render(
    <EmailVerificationEmail verificationToken={token} />
  );

  const data = {
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Email Verifizierung',
    html: emailHtml,
  };

  transporter.sendMail(data, (err, info) => {
    if (err) {
      throw new Error(err.message);
    }
  });
}
