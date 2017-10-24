import { NgModule } from '@angular/core';
import { WwComponent } from './ww.component';
import { SafeHtmlPipe } from './ww-safehtml.pipe';

import { GlobalModule } from '../global.module';

import { NgxEditorModule } from '../ngx-editor/ngx-editor.module';
import { BrowserModule } from '@angular/platform-browser';

import { FroalaEditorModule } from './froala/editor.module';
import { FroalaViewModule } from './froala/view.module';

@NgModule({
    declarations : [
        WwComponent,
    ],
    imports : [
        BrowserModule,
        GlobalModule,
        NgxEditorModule,
        FroalaEditorModule, 
        FroalaViewModule,
    ],
    exports :[
        
    ]
})
export class WwModule {

}