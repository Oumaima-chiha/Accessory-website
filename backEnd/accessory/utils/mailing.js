const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports.sendingMail = async ({ from, to, subject, text }) => {
  try {
    let mailOptions = {
      from,
      to,
      subject,
      text,
    };
    const transporter = nodemailer.createTransport({
      direct: true,
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
