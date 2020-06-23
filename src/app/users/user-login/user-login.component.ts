import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from '../../shared/authentication/authentication.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  subscription: Subscription;
  isSignUpSuccessful$: Observable<boolean>;
  isSessionExpired$: Observable<boolean>;
  errorMessage: string;

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
    this.isSignUpSuccessful$ = this.authenticationService.isSignUpSuccessful;
    this.isSessionExpired$ = this.authenticationService.isSessionExpired;
  }

  onSignUp() {
    this.router.navigate(['sign-up']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.subscription = this.authenticationService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
          (loginResponse) => {
            this.router.navigate(['events']);
          },
          (error: HttpErrorResponse) => {
            this.errorMessage = error.error.message;
          }
        );
    } else {
      this.loginForm.markAllAsTouched();
      console.error('Login form is not valid!');
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
