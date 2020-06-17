import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${environment.sportbookApiEndpoint}/auth/login`, { email, password })
      .pipe(tap(this.setSession));
  }

  setSession(loginResponse: AuthResponse) {
    const expiresAt = moment().add(loginResponse.expires_in, 'second');
    localStorage.setItem('access_token', loginResponse.access_token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  public isLoggedIn() {
    return this.getAccessToken() && moment().isBefore(this.getExpiration());
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

interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: string;
}
