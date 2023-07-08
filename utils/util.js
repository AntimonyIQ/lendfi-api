const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const twilio = require("twilio");

async function sendMail(email, subject, message) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "",
      pass: "",
    },
  });

  const mailOptions = {
    from: "",
    to: email,
    subject: subject,
    text: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return true;
  } catch (err) {
    console.error("Error sending email:", err);
    return false;
  }
}

async function sendSMS(from, to, body) {
  try {
    const accountSid = "";
    const authToken = "";
    const client = new twilio(accountSid, authToken);
    const message = await client.messages.create({
      body: body,
      from: from,
      to: "+1" + to,
    });

    console.log(message);

    console.log(message.sid);
    if (
      (typeof message.sid !== "undefined" &&
        message.sid !== null &&
        message.sid !== "") == true
    ) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error sending message:", error);
    return false;
  }
}

async function generateOTP() {
  const digits = "0123456789";
  let OTP = "";

  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }

  return OTP;
}

async function generateRandomString() {
  const currentDate = new Date();

  const timestamps = currentDate.getTime();

  const random = Math.floor(10000 + Math.random() * 90000).toString();

  return `${timestamps}${random}`;
}



module.exports = {
  sendMail,
  sendSMS,
  generateOTP,
  generateRandomString
};
