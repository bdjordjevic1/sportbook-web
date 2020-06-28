import { NotificationType } from './notification-type.enum';

export interface NotificationWrapper {
  key: string;
  message: string;
  type: NotificationType;
}
