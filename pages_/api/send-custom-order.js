const formidable = require("formidable");
const {
  invalidateFiles,
  check
} = require("../../server/validation/custom-order.validators");
const { transporter } = require("../../server/services/mailer");
const mailConfig = require("../../server/config/nodemailer");
const orderTemplate = require("../../server/templates/email/send-custom-order/send-custom-order");
const ejs = require("ejs");

export default async (req, res) => {
  try {
    if (req.method !== "POST") {
      res.statusCode = 404;
      return res.end();
    }

    const sizeLimitBytes = 1024 * 1024 * 20; // 20 MB}
    if (Number(req.headers["content-length"]) > sizeLimitBytes) {
      res.statusCode = 422;
      return res.json({ message: "Body is too big" });
    }

    let form = new formidable.IncomingForm();
    const formfields = await new Promise(function(resolve, reject) {
      form.parse(req, function(err, fields, files) {
        if (err) {
          reject(err);
          return;
        }
        resolve({ fields: fields, files: files });
      });
    });
    if (Array.isArray(check(formfields.fields))) {
      return res.status(422).json({ message: "invalid form fields" });
    }
    if (invalidateFiles(formfields.files)) {
      return res.status(422).json({ message: "invalid files" });
    }
    const html = ejs.render(orderTemplate, formfields.fields);
    await transporter.sendMail({
      from: mailConfig.MAIL_USER, // sender address
      to: mailConfig.MAIL_USER, // list of receivers
      subject: "[AXES] Индивидуальный заказ", // Subject line
      html,
      attachments: Object.keys(formfields.files).map(fileKey => ({
        filename: formfields.files[fileKey].name,
        path: formfields.files[fileKey].path,
        contentType: formfields.files[fileKey].type
      }))
    });
    return res.status(200).json({ message: "Done" });
  } catch (e) {
    console.error(e);
    res.statusCode = 500;
    res.end("Error occurred");
  }
};

export const config = {
  api: {
    bodyParser: false
  }
};
