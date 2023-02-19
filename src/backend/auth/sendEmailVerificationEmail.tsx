import { render } from '@react-email/render';
import EmailVerificationEmail from '../../../emails/emailVerification';
import { getMailTransporter } from '../utils/mailer';

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

  const transporter = getMailTransporter();
  transporter.sendMail(data, (err) => {
    if (err) {
      throw new Error(err.message);
    }
  });
  transporter.close();
}
