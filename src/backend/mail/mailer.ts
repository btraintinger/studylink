import nodemailer from 'nodemailer';

const port = Number(process.env.MAIL_PORT);

export function getMailTransporter() {
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  return transport;
}
