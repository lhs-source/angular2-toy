
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CatsComponent } from './cat/cats.component';
import { CatService } from './cat/cats.service';

import { CalendarModule } from './calendar/calendar.module';

import { ChatModule } from './chat/chat.module';

import { UserModule } from './user/user.module';

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
    ChatModule,
    UserModule,
  ],
  providers: [ //HeroService,
              CatService, ],
  bootstrap: [ AppComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
