const API_KEY = "";
const DOMAIN = "";
const mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

sendMail = function (sender_email, receiver_email, email_subject, email_body) {
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
};

const sender_email = "";
const receiver_email = "";
const email_subject = "Mailgun Demo";
const email_body = "Greetings from geeksforgeeks";

// User-defined function to send email
sendMail(sender_email, receiver_email, email_subject, email_body);
