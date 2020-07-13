import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../shared/authentication/dto/ApiResponse';
import { Media } from '../../shared/model/media.model';
import { User } from '../../shared/model/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getCurrentUser() {
    return this.http.get<User>(`${environment.sportbookApiEndpoint}/users/current`);
  }

  updateCurrentUser(user: User) {
    return this.http.patch<ApiResponse>(`${environment.sportbookApiEndpoint}/users/current/update`, user);
  }

  changeProfilePicture(profilePicture: File) {
    const body = new FormData();
    body.append('media', profilePicture);
    return this.http.post<Media>(`${environment.sportbookApiEndpoint}/users/change-profile-picture`, body);
  }
}
