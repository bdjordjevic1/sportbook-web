import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/authentication/authentication.service';
import { SignUpRequest } from '../../shared/authentication/dto/SignUpRequest';
import { ApiResponse } from '../../shared/authentication/dto/ApiResponse';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.scss'],
})
export class UserSignUpComponent implements OnInit {
  signUpForm: FormGroup;
  errorMessage: string;

  constructor(private router: Router, private authService: AuthenticationService) {}

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
      this.authService.signUp(this.createSignUpRequest()).subscribe(
        (response: ApiResponse) => {
          this.authService.signUpSuccess();
          this.router.navigate(['login']);
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.error.message;
        }
      );
    } else {
      this.signUpForm.markAllAsTouched();
      this.errorMessage = 'Sign up form is not valid';
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
