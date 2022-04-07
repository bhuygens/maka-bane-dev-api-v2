import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  auth: {
    user: 'no-reply.maka-bane@huygens.io',
    pass: 'Benhugmatmax4!',
  },
  port: 465,
  host: 'smtp.ionos.fr',
  secure: true,
});

export enum senderMailAccount {
  SUPPORT = 'support@maka-bane.be',
  CONTACT = 'contact.maka-bane@huygens.io', // 'contact@maka-bane.be',
  ORDER = 'order@maka-bane.be',
  NO_REPLY = 'no-reply@maka-bane.be',
}

function createMailParams(
  sender: string,
  receiver: string,
  subject: string,
  content: string,
) {
  return {
    from: sender, // sender address
    to: receiver, // list of receivers
    subject: subject, // Subject line
    html: content, // plain text body
  };
}

export function createMailToSupportModel(
  customerName: string,
  email: string,
  message: string,
): string {
  return `
<h1>Un nouveau message vient d'être envoyé !</h1>
<h2>Nom du client : ${customerName}</h2>
<h2>Mail du client : ${email}</h2>
<p>Message du client : ${message}</p>
`;
}

export async function sendEmail(
  sender: string,
  receiver: string,
  subject: string,
  content: string,
): Promise<boolean> {
  const mailData = createMailParams(sender, receiver, subject, content);
  return await transporter.sendMail(
    mailData,
    async (err: any, info: any): Promise<boolean> => {
      if (err) {
        return false;
      } else {
        return true;
      }
    },
  );
}
