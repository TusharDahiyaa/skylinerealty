const cron = require("node-cron");
const UserModel = require("../model/user.model");
const EmailTransporter = require("../notifier/emailService");
require("dotenv").config();

cron.schedule("*/5 * * * * *", async () => {
  //Get the tickets with UN_SENT status and send those mails for those tickets
  const notifications = await UserModel.find({
    sendStatus: "UN_SENT",
  });

  //Send the mail to all the recipients from the array of tickets using the email transporter
  notifications.forEach((notification) => {
    var mailOptions = {
      from: process.env.authEmail,
      to: notification.email,
      subject: "Query about Skyline Realty!",
      text: `Hi ${notification.name},

We have received your query regarding Skyline Realty. We will get back to you as soon as possible.

Query: "${notification.userMessage}"

Thanks for your interest!


Best Regards,
Skyline Realty
# 9560557002, 011 45680233`,
    };

    EmailTransporter.sendMail(mailOptions, async (err, info) => {
      if (err) {
        console.log("Error while sending email: " + err);
      } else {
        const savedNotification = await UserModel.findOne({
          _id: notification._id,
        });

        savedNotification.sendStatus = "SENT";

        await savedNotification.save();
      }
    });
  });
});
