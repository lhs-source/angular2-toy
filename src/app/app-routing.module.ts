
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './hero/dashboard.component'; 
import { HeroDetailComponent } from './hero/hero-detail.component';
import { HeroesComponent } from './hero/heroes.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes : Routes = [
  {
    path: 'heroes',
    component: HeroesComponent
  },
  {
    path : '',
    redirectTo : '/dashboard',
    pathMatch : 'full'
  },
  {
    path : 'dashboard',
    component : DashboardComponent
  },
  {
    path : 'detail/:totalPower',
    component : HeroDetailComponent
  },
  {
    path: 'calendar',
    component : CalendarComponent,
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