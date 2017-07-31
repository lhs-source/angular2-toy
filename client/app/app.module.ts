
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './http/in-memory-data.service';

import { AppComponent } from './app.component';
//import { DashboardComponent } from './hero/dashboard.component'; 
//import { HeroDetailComponent } from './hero/hero-detail.component';
//import { HeroesComponent } from './hero/heroes.component';
//import { HeroService } from './hero/hero.service';
import { AppRoutingModule } from './app-routing.module';
//import { HeroSearchComponent }  from './hero/hero-search.component';

import { CatsComponent } from './cat/cats.component';
import { CatService } from './cat/cats.service';

import { CalendarModule } from './calendar/calendar.module';



@NgModule({
  declarations: [
    AppComponent,
    CatsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    CalendarModule,
  ],
  providers: [ //HeroService,
              CatService, ],
  bootstrap: [ AppComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
