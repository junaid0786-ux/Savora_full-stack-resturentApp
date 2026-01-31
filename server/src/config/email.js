import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (to, subject, message) => {
  try {
    console.log("Started Sending Email");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSCODE,
      },
    });

    const mailOption = {
      from: process.env.GMAIL_USER,
      to,
      subject,
      html: message,
    };

    const res = await transporter.sendMail(mailOption);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;

// sendEmail("junaidkhan989793@gmail.com", "test Email", "<p> Text Message </p>");
