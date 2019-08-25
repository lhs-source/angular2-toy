
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CalendarComponent } from './calendar.component';
import { CalendarEventComponent } from './calendar-event.component';
import { CalendarService } from './calendar.service';

import { FileUploadModule } from '../wysiwyg/file/file-upload.module';

@NgModule({
    declarations : [ CalendarComponent,
                    CalendarEventComponent ],
    imports : [ BrowserModule,
                FormsModule,
                FileUploadModule ],
    providers : [ CalendarService ],
})
export class CalendarModule{
}