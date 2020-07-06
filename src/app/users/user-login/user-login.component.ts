import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../shared/authentication/authentication.service';
import { NotificationType } from '../../shared/notification/model/notification-type.enum';
import { NotificationHandler } from '../../shared/notification/service/notification-handler.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  subscription: Subscription;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationHandler: NotificationHandler
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSignUp() {
    this.loginForm.reset();
    this.router.navigate(['sign-up']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.subscription = this.authenticationService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe((loginResponse) => {
          this.router.navigate(['events/my-events']);
        });
    } else {
      this.loginForm.markAllAsTouched();
      this.notificationHandler.pushNotification('form.login.invalid', NotificationType.DANGER);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
