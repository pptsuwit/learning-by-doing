const API_KEY = "13f36368f00e78dd619c8666c12ac658-c76388c3-3db5203a";
const DOMAIN = "sandbox97d4418d26674b8f84ca7d1cb11ec317.mailgun.org";
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

const sender_email = "tiiuuyx@gmail.com";
const receiver_email = "pptsuwit@gmail.com";
const email_subject = "Mailgun Demo";
const email_body = "Greetings from geeksforgeeks";

// User-defined function to send email
sendMail(sender_email, receiver_email, email_subject, email_body);
