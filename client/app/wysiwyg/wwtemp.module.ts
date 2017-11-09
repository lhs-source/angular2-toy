import { NgModule } from '@angular/core';
import { WwComponent } from './ww.component';
import { SafeHtmlPipe } from './ww-safehtml.pipe';

import { GlobalModule } from '../global.module';

import { NgxEditorModule } from '../ngx-editor/ngx-editor.module';
import { BrowserModule } from '@angular/platform-browser';

import { FileUploadModule } from './file/file-upload.module';

//import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';


@NgModule({
    declarations : [
        WwComponent,
    ],
    imports : [
        BrowserModule,
        GlobalModule,
        NgxEditorModule,
        FileUploadModule,
        //HighlightJsModule,
    ],
    providers: [
        //HighlightJsService
    ],
    exports :[
        
    ]
})
export class WwModule {

}