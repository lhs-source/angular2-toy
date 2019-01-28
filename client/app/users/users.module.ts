import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UsersComponent } from './users.component';
@NgModule({
    declarations : [
        UsersComponent,
    ],
    imports : [
        BrowserModule,
    ],
    providers: [
        //HighlightJsService
    ],
    exports :[
        
    ]
})
export class UsersModule {
    
}
