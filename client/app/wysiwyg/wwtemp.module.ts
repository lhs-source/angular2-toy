import { NgModule } from '@angular/core';
import { WwComponent } from './ww.component';
import { SafeHtmlPipe } from './ww-safehtml.pipe';

import { GlobalModule } from '../global.module';

@NgModule({
    declarations : [
        WwComponent,
    ],
    imports : [
        GlobalModule
    ],
    exports :[
        
    ]
})
export class WwModule {

}