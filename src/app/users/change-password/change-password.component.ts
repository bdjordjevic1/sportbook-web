import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { NotificationType } from '../../shared/notification/model/notification-type.enum';
import { NotificationHandler } from '../../shared/notification/service/notification-handler.service';
import CustomValidators from '../../shared/util/custom-validators.util';
import { ChangePassword } from '../model/change-password.model';
import { ResetPasswordService } from '../service/reset-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  token: string;

  constructor(
    private resetPasswordService: ResetPasswordService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationHandler: NotificationHandler
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: Params) => {
      console.log(queryParams);
      this.token = queryParams.token;
    });
    this.changePasswordForm = new FormGroup({
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required, CustomValidators.matchingPasswords]),
    });
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      this.resetPasswordService
        .changePassword({
          password: this.changePasswordForm.get('password').value,
          token: this.token,
        } as ChangePassword)
        .subscribe((response) => {
          this.notificationHandler.pushNotification(response.key, NotificationType.SUCCESS, response.message);
          this.router.navigate(['login']);
        });
    }
  }
}
