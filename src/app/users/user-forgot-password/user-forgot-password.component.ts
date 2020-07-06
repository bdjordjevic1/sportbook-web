import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from '../../shared/notification/model/notification-type.enum';
import { NotificationHandler } from '../../shared/notification/service/notification-handler.service';
import { ResetPassword } from '../model/reset-password.model';
import { ResetPasswordService } from '../service/reset-password.service';

@Component({
  selector: 'app-user-forgot-password',
  templateUrl: './user-forgot-password.component.html',
  styleUrls: ['./user-forgot-password.component.scss'],
})
export class UserForgotPasswordComponent implements OnInit, OnDestroy {
  resetPasswordForm: FormGroup;
  subscription: Subscription;

  constructor(
    private notificationHandler: NotificationHandler,
    private resetPasswordService: ResetPasswordService,
    private router: Router
  ) {}

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.subscription = this.resetPasswordService
        .sendResetPasswordEmail({
          email: this.resetPasswordForm.get('email').value,
        } as ResetPassword)
        .subscribe((response) => {
          this.notificationHandler.pushNotification(response.key, NotificationType.SUCCESS, response.message);
          this.router.navigate(['login']);
        });
    } else {
      this.resetPasswordForm.markAllAsTouched();
      this.notificationHandler.pushNotification('form.login.invalid', NotificationType.DANGER);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
