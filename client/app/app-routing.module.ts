
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';

import { CatsComponent } from './cat/cats.component';

import { ChatComponent } from './chat/chat.component';

import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/login/logout.component';
import { AccountComponent } from './user/account/account.component';
import { AdminComponent } from './user/admin/admin.component';

import { AuthGuardLogin } from './user/auth-guard-login.service';
import { AuthGuardAdmin } from './user/auth-guard-admin.service';

const routes : Routes = [
  { // default
    path : '',
    redirectTo : '/calendar',
    pathMatch : 'full'
  },
  {
    path: 'calendar',
    component : CalendarComponent,
  },
  { 
    path: 'cats', 
    component: CatsComponent 
  },
  { 
    path: 'chats', 
    component: ChatComponent 
  },
  { 
    path: 'register', 
    component: RegisterComponent 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'logout', 
    component: LogoutComponent 
  },
  { 
    path: 'account', 
    component: AccountComponent, 
    canActivate: [AuthGuardLogin] 
  },
  { 
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [AuthGuardAdmin] 
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports : [
    RouterModule
  ],
})
export class AppRoutingModule{

}