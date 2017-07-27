import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';

@NgModule({
    declarations : [ CalendarComponent ],
    imports : [ BrowserModule ],
    providers : [ CalendarService ],
})
export class CalendarModule{
}