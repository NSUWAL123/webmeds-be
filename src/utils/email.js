const nodemailer = require("nodemailer");

const sendMail = (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.USER_EMAIL,
    to: email,
    subject: subject,
    html: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const sendSignUpSuccessfulMail = (email, name) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.USER_EMAIL,
    to: email,
    subject: "Welcome to webmeds!",
    html: `
    <div style="width: 100%;">
      <div style="">
          <img src="cid:web" style=" margin-left: 200px; margin-bottom: 20px"/>
          <div style="background-color: rgb(239, 239, 239); padding: 20px; width: 500px; border-radius: 30px;">
            <p>Hi ${name},</p>
            <br />
            <p>You have successfully registered to webmeds.</p>
            <p><b>Thank you for joining webmeds!</b></p>
            <p>Have a great day!</p>
            <br />
            <p>Sincerely,</p>
            <p>The Team at webmeds</p>
          </div>
      </div>
  </div>`,
    attachments: [
      {
        filename: "logo.png",
        path: __dirname + "/logo.png",
        cid: "web",
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendMail, sendSignUpSuccessfulMail };
