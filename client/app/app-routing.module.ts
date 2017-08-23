
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';

import { CatsComponent } from './cat/cats.component';

import { ChatComponent } from './chat/chat.component';

import { WwComponent } from './wysiwyg/ww.component';

import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/login/logout.component';
import { AccountComponent } from './user/account/account.component';
import { AdminComponent } from './user/admin/admin.component';
import { CssComponent } from './css-practice/css.component';
import { HomeComponent } from './home/home.component';
import { ThreadComponent } from './board/thread.component';
import { ThreadDetailComponent } from './board/thread-detail.component';
import { ThreadListComponent } from './board/thread-list.component';
import { ThreadAddComponent } from './board/thread-add.component';
import { ThreadEditComponent } from './board/thread-edit.component';

import { AuthGuardLogin } from './user/auth-guard-login.service';
import { AuthGuardAdmin } from './user/auth-guard-admin.service';

const routes : Routes = [
  { // default
    path : '',
    redirectTo : '/login',
    pathMatch : 'full'
  },
  {
    path: 'calendar',
    component : CalendarComponent,
    canActivate: [AuthGuardLogin] 
  },
  { 
    path: 'cats', 
    component: CatsComponent ,
    canActivate: [AuthGuardLogin] 
  },
  { 
    path: 'chats', 
    component: ChatComponent,
    canActivate: [AuthGuardLogin] 
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
  {
    path: 'editor', 
    component: WwComponent, 
    canActivate: [AuthGuardLogin] 
  },
  {
    path: 'css', 
    component: CssComponent,
    canActivate: [AuthGuardLogin] 
  },
  {
    path: 'home',
    component : HomeComponent,
  },
  {
    path: 'thread',
    component : ThreadComponent,
    canActivate: [AuthGuardLogin],
    children :[
      { // default
        path : '',
        redirectTo : 'thread-list',
        pathMatch : 'full'
      },
      {
        path: 'thread-list',
        component : ThreadListComponent,
      },
      {
        path: 'thread-detail/:id',
        component : ThreadDetailComponent,
      },
      {
        path: 'thread-add',
        component : ThreadAddComponent,
      },
      {
        path: 'thread-edit/:id',
        component : ThreadEditComponent,
      },
    ]
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