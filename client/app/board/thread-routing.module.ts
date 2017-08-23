import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ThreadDetailComponent } from './thread-detail.component';
import { ThreadListComponent } from './thread-list.component';

const routes : Routes = [
  { // default
    path : 'thread',
    redirectTo : 'thread-list1',
    pathMatch : 'full'
  },
  {
    path: 'thread-list1',
    component : ThreadListComponent,
  },
  {
    path: 'thread-detail',
    component : ThreadDetailComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports : [
    RouterModule
  ],
})
export class ThreadRoutingModule{

}