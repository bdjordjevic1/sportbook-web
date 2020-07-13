import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../shared/authentication/authentication.service';
import { ApiResponse } from '../../shared/authentication/dto/ApiResponse';
import { Media } from '../../shared/model/media.model';
import { User } from '../../shared/model/user.model';
import { NotificationType } from '../../shared/notification/model/notification-type.enum';
import { NotificationHandler } from '../../shared/notification/service/notification-handler.service';
import { HttpUtils } from '../../shared/util/http.utils';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent implements OnDestroy {
  accountForm: FormGroup;
  currentUserSubscription: Subscription;
  currentUser: User;
  profilePicture: string | ArrayBuffer = '/assets/icon/signup_male.png';
  isLoading: boolean;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private notificationHandler: NotificationHandler
  ) {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      if (event.url === '/account') {
        this.initializeData();
      }
    });
  }

  initializeData() {
    this.accountForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
    });
    this.currentUserSubscription = this.userService.getCurrentUser().subscribe((user: User) => {
      this.currentUser = user;
      if (user.profilePicture) {
        this.profilePicture = HttpUtils.getMediaFullUrl(this.currentUser.profilePicture.url);
      }
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

  changeProfilePicture(event) {
    this.isLoading = true;
    const file = event.target.files[0];
    console.log(file);
    this.userService.changeProfilePicture(file).subscribe((media: Media) => {
      this.profilePicture = HttpUtils.getMediaFullUrl(media.url);
      this.isLoading = false;
    });
  }

  onLogout() {
    this.authService.logout();
    this.accountForm = null;
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }
}
