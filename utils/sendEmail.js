const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  var transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ID, // Set in ENV variable
      pass: process.env.EMAIL_PASSWORD // Set in ENV variable
    }
  });

  const message = {
    from: process.env.EMAIL_ID, // Set in ENV variable
    to: options.email,
    subject: options.subject,
    // text: options.message,
    html: options.html
  };

  const info = await transport.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;
