const API_KEY = process.env.MAIL_API_KEY;
const DOMAIN = process.env.MAIL_DOMAIN;
const mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

export function sendMail(sender_email: string, receiver_email: string, email_subject: string, email_body: string) {
  const data = {
    from: sender_email,
    to: receiver_email,
    subject: email_subject,
    text: email_body,
  };

  mailgun.messages().send(data, (error, body) => {
    if (error) console.log(error);
    else console.log(body);
  });
}
