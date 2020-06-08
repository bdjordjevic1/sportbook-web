import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserList } from '../model/user-list.model';
import { User } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class TeammatesService {
  addedTeammates$ = new BehaviorSubject([]);
  private addedTeammates: User[] = [];

  constructor(private http: HttpClient) {}

  getTeammates(): Observable<UserList> {
    return this.http.get<UserList>(`${environment.sportbookApiEndpoint}/users`);
  }

  addTeammate(teammate: User) {
    this.addedTeammates.push(teammate);
    this.addedTeammates$.next(this.addedTeammates.slice());
  }

  addTeammates(teammates: User[]) {
    this.addedTeammates = teammates;
    this.addedTeammates$.next(this.addedTeammates.slice());
  }

  removeTeammate(teammate: User) {
    this.addedTeammates = this.addedTeammates.filter((currTeammate) => currTeammate.email !== teammate.email);
    this.addedTeammates$.next(this.addedTeammates.slice());
  }
}
