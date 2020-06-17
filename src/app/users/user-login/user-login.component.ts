import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../shared/authentication/authentication.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  subscription: Subscription;

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onRegister() {
    this.router.navigate(['register']);
  }

  onSubmit() {
    this.subscription = this.authenticationService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((loginResponse) => {
        this.router.navigate(['tabs/groups']);
        console.log(loginResponse);
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
