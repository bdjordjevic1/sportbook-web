import { Injectable } from '@angular/core';
import { NOTIFICATIONS } from '../../constants/constants';
import { NotificationWrapper } from '../model/notification.wrapper';

@Injectable({ providedIn: 'root' })
export class NotificationMessageService {
  constructor() {}

  getNotificationMessage(key: string) {
    return NOTIFICATIONS.find((notification: NotificationWrapper) => {
      return notification.key === key;
    })?.message;
  }
}
