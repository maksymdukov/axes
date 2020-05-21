const nodemailer = require('nodemailer');
const mailConfig = require('../config/nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: mailConfig.MAIL_USER,
    pass: mailConfig.MAIL_PASSWORD
  }
});

module.exports = { transporter };
