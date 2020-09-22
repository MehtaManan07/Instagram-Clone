const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Manan Mehta <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      //sendgrid
      return nodemailer.createTransport({
        service: 'Sendgrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        }
      })
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(html, subject) {
    // 2) Define the email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      // text: options.message,
      html,
    };

    // 3) Actually send the email
    await this.newTransport().sendMail(mailOptions);
  }

//   async sendWelcome() {
//     await this.send('Welcome html template', 'Welcome to the Natours family');
//   }

  async sendPasswordReset(resetURL){
    await this.send(`Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\n If you didn't forget your password please ignore this email`,'Your password reset token (valid for 10 mins)')
  }
};
