
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';

@NgModule({
    declarations : [ CalendarComponent ],
    imports : [ BrowserModule,
                FormsModule ],
    providers : [ CalendarService ],
})
export class CalendarModule{
}