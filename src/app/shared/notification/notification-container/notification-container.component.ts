import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationWrapper } from '../model/notification.wrapper';
import { NotificationHandler } from '../service/notification-handler.service';

@Component({
  selector: 'app-notification-container',
  templateUrl: './notification-container.component.html',
  styleUrls: ['./notification-container.component.scss'],
})
export class NotificationContainerComponent implements OnInit {
  notifications$: Observable<NotificationWrapper[]>;

  constructor(private notificationHandler: NotificationHandler) {}

  ngOnInit() {
    this.notificationHandler.removeAllNotifications();
    this.notifications$ = this.notificationHandler.notifications$;
  }

  removeNotification(notification: NotificationWrapper) {
    this.notificationHandler.removeNotification(notification);
  }
}
