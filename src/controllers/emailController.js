const nodemailer = require('nodemailer');
require('dotenv').config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAILPASS,
  },
});

module.exports = {
  async create(request, response) {
    const { emails, subject, message } = request.body;

    var mailOptions = {
      from: process.env.EMAIL,
      to: emails.join(','),
      subject: subject,
      text: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        response.json(error);
      }
    });

    response.json();
  },
};
