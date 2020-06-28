import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { NotificationType } from '../notification/model/notification-type.enum';
import { NotificationHandler } from '../notification/service/notification-handler.service';
import { ApiResponse } from './dto/ApiResponse';
import { AuthResponse } from './dto/AuthResponse';
import { SignUpRequest } from './dto/SignUpRequest';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient, private notificationHandler: NotificationHandler) {}
  isSignUpSuccessful = new BehaviorSubject(false);
  isSessionExpired = new BehaviorSubject(false);

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${environment.sportbookApiEndpoint}/auth/login`, { email, password })
      .pipe(tap(this.setSession));
  }

  signUp(signUpRequest: SignUpRequest) {
    return this.http.post<ApiResponse>(`${environment.sportbookApiEndpoint}/auth/signup`, signUpRequest);
  }

  signUpSuccess() {
    this.notificationHandler.pushNotification('form.signUp.success', NotificationType.SUCCESS);
  }

  setSession(loginResponse: AuthResponse) {
    const expiresAt = moment().add(loginResponse.expires_in, 'second');
    localStorage.setItem('access_token', loginResponse.access_token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  public isLoggedIn() {
    return this.getAccessToken() && moment().isBefore(this.getExpiration());
  }

  logoutWhenSessionExpired() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    this.notificationHandler.pushNotification('session.expired', NotificationType.WARNING);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }
}
