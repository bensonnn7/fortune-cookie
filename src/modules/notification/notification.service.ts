import * as nodemailer from 'nodemailer';
import { InjectRepository } from '@nestjs/typeorm';

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Notification, ENTITY_STATUS } from './notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { generate } from 'rxjs';
const NODE_MAILER_CONFIG = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'snysn7@gmail.com',
    pass: 'rhudsaukpqpbdzyi',
  },
};

@Injectable()
export class NotificationService {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {
    this.transporter = nodemailer.createTransport(NODE_MAILER_CONFIG);
  }
  // function expose to controller or other services
  async addNotifications(notifications: Array<CreateNotificationDto>) {
    for (let i = 0; i < notifications.length; i++) {
      const notification = new Notification();
      notification.user = notifications[i].userId;
      notification.product = notifications[i].productId;
      notification.status = ENTITY_STATUS.PENDING;

      this.notificationRepository.save(notification);
    }
  }

  async sendNotification() {
    // step 1: get all pending notification
    const pendingNotifications = await this.notificationRepository.find({
      relations: ['user', 'product'],
      where: { status: ENTITY_STATUS.PENDING },
    });
    // console.log('pendingNotifications: ', pendingNotifications);

    // step 2: send email
    const successList = await this.sendEmails(pendingNotifications);
    // console.log('successList: ', successList);

    // step 3: update notification status
    return await this.updateNotificationStatus(successList, ENTITY_STATUS.SENT);

    // TODO: step 4: handle fail list
  }

  // internal helper functions with side effects
  async sendEmails(
    pendingNotifications: Array<Notification>,
  ): Promise<Array<number>> {
    const successList = [];

    for (let i = 0; i < pendingNotifications.length; i++) {
      const notification = pendingNotifications[i];
      // 1. generate email options
      const { userEmail, content } = await this.generateEmailInfo(notification);
      try {
        const emailOptions = this.generateEmailOptions(userEmail, content);
        // 2. send email
        const info = await this.transporter.sendMail(emailOptions);
        successList.push(notification.id);
        await this.notificationRepository.save(notification);
      } catch (error) {
        throw new Error(error);
      }
    }

    return successList;
  }

  async updateNotificationStatus(ids: Array<number>, status: ENTITY_STATUS) {
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      try {
        const notification = await this.notificationRepository.findOne({
          where: { id },
        });
        notification.status = status;
        await this.notificationRepository.save(notification);
      } catch (error) {
        throw new Error(error);
      }
    }
  }

  // internal pure helper functions
  generateEmailInfo(pendingNotifications: Notification) {
    const { user, product } = pendingNotifications;
    const { name, url, targetPrice } = product;
    const { email } = user;
    const content = `Hi, your product ${name} is now at ${targetPrice}, please check it out at ${url}`;
    return { userEmail: email, content };
  }

  generateEmailOptions(userEmail: string, content: string) {
    return {
      from: 'snysn7@gmail.com',
      subject: 'Price drop!',
      to: userEmail,
      text: content,
    };
  }
}
