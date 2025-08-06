import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import logger from "./logger.js";

dotenv.config();

export const sendMail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Note App',
      link: 'https://yourappdomain.com'
    }
  });

  const emailBody = mailGenerator.generate(options.mailGenContent);
  const emailText = mailGenerator.generatePlaintext(options.mailGenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    secure: false,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const mail = {
    from: '"Note App" <no-reply@noteapp.com>',
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailBody,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    logger.error("Email failed to send:", error.message || error);
  }
};

export const emailVerificationMailgenContent = (name, verificationUrl) => {
  return {
    body: {
      name,
      intro: "Welcome to Note App! We're very excited to have you on board.",
      action: {
        instructions: "Click the button below to verify your email:",
        button: {
          color: '#22BC66',
          text: 'Verify your account',
          link: verificationUrl,
        },
      },
      outro: "If you have any questions, feel free to reply to this email.",
    },
  };
};


