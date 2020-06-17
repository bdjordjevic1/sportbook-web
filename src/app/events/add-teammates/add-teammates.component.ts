import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { UserList } from '../../shared/model/user-list.model';
import { User } from '../../shared/model/user.model';
import { TeammatesService } from '../../shared/service/teammates.service';

@Component({
  selector: 'app-add-teammates',
  templateUrl: './add-teammates.component.html',
  styleUrls: ['./add-teammates.component.scss'],
})
export class AddTeammatesComponent implements OnInit, OnDestroy {
  teammates$: Observable<UserList>;
  addedTeammates: User[] = [];
  subscription: Subscription;

  constructor(private teammatesService: TeammatesService, private router: Router) {}

  ngOnInit() {
    this.teammates$ = this.teammatesService.getTeammates();
    this.teammatesService.addedTeammates$.subscribe((teammates) => {
      this.addedTeammates = teammates;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addTeammate(teammate: User) {
    this.addedTeammates.push(teammate);
  }

  addTeammates() {
    this.teammatesService.addTeammates(this.addedTeammates);
    this.router.navigate(['../..']);
  }
}
