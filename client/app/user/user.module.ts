import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { AuthGuardLogin } from './auth-guard-login.service';
import { AuthGuardAdmin } from './auth-guard-admin.service';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './login/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';

import { UIsModule } from '../uis/uis.module';

@NgModule({
    declarations: [
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    UIsModule,
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    UserService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule {

}