import { Injectable } from '@nestjs/common';
// import nodemailer from 'nodemailer';
import * as nodemailer from 'nodemailer';

const NODE_MAILER_CONFIG = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'snysn7@gmail.com',
    pass: 'rhudsaukpqpbdzyi',
  },
};
const mailOptions = {
  from: 'youremail@gmail.com',
  to: 'jiazheng.guo7@gmail.com',
  subject: 'Price tracker',
  text: 'Price drop',
};

@Injectable()
export class NotificationService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport(NODE_MAILER_CONFIG);
  }

  async sendNotification() {
    console.log('start send email');
    // async sendNotification({name: string, price: number}) {
    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      throw new Error(error);
      console.log(error);
    }
  }
}
