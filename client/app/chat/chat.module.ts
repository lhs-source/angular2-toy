import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//import { MaterialModule } from '@angular/material';
import { ChatComponent } from './chat.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        //MaterialModule.forRoot(),
    ],
    declarations:[
        ChatComponent,
        
    ],
    exports:[
        ChatComponent,

    ]
})
export class ChatModule { }