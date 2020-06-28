import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationType } from '../../model/notification-type.enum';
import { NotificationHandler } from '../../service/notification-handler.service';

@Injectable({ providedIn: 'root' })
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private notificationHandler: NotificationHandler) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notificationHandler.pushNotification(error.error.error, NotificationType.DANGER, error.error.message);
        return throwError(error);
      })
    );
  }
}
