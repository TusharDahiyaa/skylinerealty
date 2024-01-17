const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.authEmail,
    pass: process.env.authPassKey,
  },
});
