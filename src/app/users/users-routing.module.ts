import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserForgotPasswordComponent } from './user-forgot-password/user-forgot-password.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignUpComponent } from './user-register/user-sign-up.component';

const routes: Routes = [
  { path: 'login', component: UserLoginComponent },
  { path: 'sign-up', component: UserSignUpComponent },
  { path: 'forgot-password', component: UserForgotPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'account', component: UserAccountComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
