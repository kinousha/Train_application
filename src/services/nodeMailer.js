"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function cancelMail() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "kinousha34@gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'kinekhouma@esp.sn', // sender address
    to: 'kinousha34@gmail.com', // list of receivers
    subject: "Cancel booking ✔", // Subject line
    text: "The booking is successfuly canceled", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
async function bookMail() {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user, 
      pass: testAccount.pass, 
    },
  });
  let info = await transporter.sendMail({
    from: 'kinekhouma@esp.sn', 
    to: 'kinousha34@gmail.com', 
    subject: "Cancel booking ✔", 
    text: "The booking is made successfuly ",
    html: "<b>Hello </b>",
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

cancelMail().catch(console.error);
bookMail().catch(console.error);

module.exports = {
  cancelMail,
  bookMail
}
