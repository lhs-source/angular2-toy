import { NgModule } from '@angular/core';
import { WwComponent } from './ww.component';
import { SafeHtmlPipe } from './ww-safehtml.pipe';

@NgModule({
    declarations : [
        WwComponent,
        SafeHtmlPipe,
    ],
    exports :[
        SafeHtmlPipe,
    ]
})
export class WwModule {

}