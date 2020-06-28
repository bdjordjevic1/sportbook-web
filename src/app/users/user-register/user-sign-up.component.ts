import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/authentication/authentication.service';
import { SignUpRequest } from '../../shared/authentication/dto/SignUpRequest';
import { ApiResponse } from '../../shared/authentication/dto/ApiResponse';
import { NotificationType } from '../../shared/notification/model/notification-type.enum';
import { NotificationHandler } from '../../shared/notification/service/notification-handler.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.scss'],
})
export class UserSignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private notificationHandler: NotificationHandler
  ) {}

  ngOnInit() {
    this.signUpForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required, this.matchingPasswords.bind(this)]),
    });
  }

  matchingPasswords(control: FormControl) {
    if (this.signUpForm !== undefined && control.value !== this.signUpForm.get('password').value) {
      return { matchingPasswords: true };
    }
    return;
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.authService.signUp(this.createSignUpRequest()).subscribe((response: ApiResponse) => {
        this.authService.signUpSuccess();
        this.router.navigate(['login']);
      });
    } else {
      this.signUpForm.markAllAsTouched();
      this.notificationHandler.pushNotification('form.signUp.invalid', NotificationType.DANGER);
    }
  }

  createSignUpRequest() {
    return {
      firstName: this.signUpForm.get('firstName').value,
      lastName: this.signUpForm.get('lastName').value,
      email: this.signUpForm.get('email').value,
      password: this.signUpForm.get('password').value,
    } as SignUpRequest;
  }
}
