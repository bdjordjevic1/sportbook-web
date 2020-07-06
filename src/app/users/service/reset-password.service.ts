import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../shared/authentication/dto/ApiResponse';
import { ChangePassword } from '../model/change-password.model';
import { ResetPassword } from '../model/reset-password.model';

@Injectable({ providedIn: 'root' })
export class ResetPasswordService {
  constructor(private http: HttpClient) {}

  sendResetPasswordEmail(resetPassword: ResetPassword) {
    return this.http.post<ApiResponse>(`${environment.sportbookApiEndpoint}/users/reset-password`, resetPassword);
  }

  changePassword(changePassword: ChangePassword) {
    return this.http.post<ApiResponse>(`${environment.sportbookApiEndpoint}/users/change-password`, changePassword);
  }
}
