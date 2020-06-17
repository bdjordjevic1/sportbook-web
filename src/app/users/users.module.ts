import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { UserForgotPasswordComponent } from './user-forgot-password/user-forgot-password.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [SharedModule, FormsModule, UsersRoutingModule, IonicModule, CommonModule],
  declarations: [UserLoginComponent, UserRegisterComponent, UserForgotPasswordComponent],
})
export class UsersModule {}
