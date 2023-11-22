const nodemailer = require("nodemailer");
require('dotenv').config();
const {
    HOST_EMAIL,
    PORT_EMAIL,
    USER_EMAIL,
    PASSWORD_EMAIL,
  } = process.env;


const transporter = nodemailer.createTransport({
  host: HOST_EMAIL,
  port: PORT_EMAIL,
  secure: true,
  auth: {
    user: USER_EMAIL,
    pass: PASSWORD_EMAIL
  },
    tls: {
    rejectUnauthorized: false
  }
});
transporter.verify().then(() => {
  console.log('Ready for send mails');
})


module.exports = transporter