
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

import { WwModule } from './wysiwyg/wwtemp.module';

import { CssModule } from './css-practice/css.module';

import { HomeComponent } from './home/home.component';

import { ColorPickerModule } from './colorPicker/color-picker.module';

import { ThreadModule } from './board/thread.module';

import { AppHeaderComponent } from './headerfooter/appheader.component';
import { AppFooterComponent } from './headerfooter/appfooter.component';
import { NavigationComponent } from './headerfooter/navigation.component'

@NgModule({
  declarations: [
    AppComponent,
    CatsComponent,
    AppHeaderComponent,
    AppFooterComponent,
    NavigationComponent,
    HomeComponent,
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
    WwModule,
    CssModule,
    ColorPickerModule,
    ThreadModule,
  ],
  providers: [ //HeroService,
              CatService, ],
  bootstrap: [ AppComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
