import notifications from '../../../assets/notifications.json';
import errors from '../../../assets/errors.json';
import { ValidationError } from '../notification/error/model/validation-error.model';
import { NotificationWrapper } from '../notification/model/notification.wrapper';

export const NOTIFICATIONS: NotificationWrapper[] = notifications;
export const VALIDATION_ERRORS: ValidationError[] = errors;
export const ROUTES_WITHOUT_TABS = ['/sign-up', '/login', '/forgot-password', '/change-password'];
