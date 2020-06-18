const Validator = require('fastest-validator');
const { transporter } = require('../../server/services/mailer');
const mailConfig = require('../../server/config/nodemailer');
const pmTemplate = require('../../server/templates/email/send-pm/send-pm');
const ejs = require('ejs');

const v = new Validator({
  messages: {
    // Register our new error message text
    phoneNumber: "The phone number must be started with '+'!"
  }
});
const schema = {
  name: { type: 'string', min: 3, max: 255 },
  surname: { type: 'string', min: 3, max: 255 },
  email: { type: 'email' },
  phone: {
    type: 'string',
    length: 17,
    optional: true,
    custom: (v) => (v.startsWith('+') ? true : [{ type: 'phoneNumber' }])
  },
  message: { type: 'string', min: 3, max: 5000 } // short-hand def
};
const check = v.compile(schema);

export default async (req, res) => {
  try {
    if (req.method !== 'POST') {
      res.statusCode = 404;
      return res.end();
    }
    if (!check(req.body)) {
      return res.status(422).send('');
    }
    const html = ejs.render(pmTemplate, req.body);
    await transporter.sendMail({
      from: mailConfig.MAIL_USER, // sender address
      to: mailConfig.MAIL_USER, // list of receivers
      subject: '[AXES] Сообщение через сайт', // Subject line
      html
    });
    res.statusCode = 200;
    res.json({});
  } catch (e) {
    console.error(e);
    res.statusCode = 500;
    res.json({ error: 'An error occured' });
  }
};
