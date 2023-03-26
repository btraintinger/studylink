import nodemailer from 'nodemailer';
import { Options } from 'nodemailer/lib/mailer';

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

export async function sendMail(options: Options) {
  const transporter = getMailTransporter();

  const server = await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error: any, success: any) {
      if (success) {
        resolve(success);
      }
      reject(error);
    });
  });

  const success = await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(options, (error, info) => {
      if (error) {
        reject(error);
      }
      resolve(info);
    });
  });

  transporter.close();
}
