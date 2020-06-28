import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../shared/authentication/authentication.service';
import { ApiResponse } from '../../shared/authentication/dto/ApiResponse';
import { User } from '../../shared/model/user.model';
import { NotificationType } from '../../shared/notification/model/notification-type.enum';
import { NotificationHandler } from '../../shared/notification/service/notification-handler.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent implements OnInit, OnDestroy {
  accountForm: FormGroup;
  currentUserSubscription: Subscription;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private notificationHandler: NotificationHandler
  ) {}

  ngOnInit() {
    this.accountForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
    });
    this.currentUserSubscription = this.userService.getCurrentUser().subscribe((user: User) => {
      this.accountForm = new FormGroup({
        id: new FormControl(user.id, [Validators.required]),
        firstName: new FormControl(user.firstName, [Validators.required]),
        lastName: new FormControl(user.lastName, [Validators.required]),
        email: new FormControl(user.email, [Validators.required]),
      });
    });
  }

  onSubmit() {
    this.userService
      .updateCurrentUser({
        id: this.accountForm.get('id').value,
        email: this.accountForm.get('email').value,
        firstName: this.accountForm.get('firstName').value,
        lastName: this.accountForm.get('lastName').value,
      } as User)
      .subscribe((response: ApiResponse) => {
        this.notificationHandler.pushNotification('profile.update.success', NotificationType.SUCCESS, response.message);
      });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }
}
