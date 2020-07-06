import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationType } from '../model/notification-type.enum';
import { NotificationWrapper } from '../model/notification.wrapper';
import { NotificationMessageService } from './notification-message.service';

@Injectable({ providedIn: 'root' })
export class NotificationHandler {
  notifications: NotificationWrapper[] = [];
  notifications$: Subject<NotificationWrapper[]> = new Subject();

  constructor(private notificationMessageService: NotificationMessageService) {}

  pushNotification(key: string, type: NotificationType, message?: string) {
    const notification = { key, type, message: this._getMessage(key, message) } as NotificationWrapper;
    if (!this._alreadyPushed(notification)) {
      this.notifications.push(notification);
    }
    this.notifications$.next(this.notifications.slice());
  }

  removeNotification(notification: NotificationWrapper) {
    this.notifications = this.notifications.filter((current) => current.key !== notification.key);
    this.notifications$.next(this.notifications.slice());
  }

  removeAllNotifications() {
    if (this.notifications.length > 0) {
      this.notifications = [];
      this.notifications$.next(this.notifications);
    }
  }

  _alreadyPushed(notification: NotificationWrapper) {
    return this.notifications.find((current) => current.key === notification.key);
  }

  _getMessage(key: string, message: string) {
    return message !== undefined ? message : this.notificationMessageService.getNotificationMessage(key);
  }
}
