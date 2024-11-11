import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'adah.wunsch30@ethereal.email',
        pass: 'KzusCPYbJWj7sVmd6hy',
      },
    });
  }

  async sendPasswordReset(): Promise<void> {
    const mailOptions = {
      from: 'aadah.wunsch30@ethereal.email',
      to: 'houcinesaidi40@gmail.com',
      subject: 'Password Reset',
      text: 'Your new password is houci123',
      html: '<b>Your new password is houci123</b>',
    };

    await this.transporter.sendMail(mailOptions);
  }
}
