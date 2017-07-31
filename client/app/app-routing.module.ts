
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';

import { CatsComponent } from './cat/cats.component';

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
  { path: 'cats', 
    component: CatsComponent 
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