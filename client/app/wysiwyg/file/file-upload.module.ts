import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgUploaderModule } from './ngx-uploader/module/ngx-uploader.module';
import { FileUploadComponent } from './file-upload.component';

@NgModule({
    declarations : [
        FileUploadComponent,
    ],
    imports : [
        BrowserModule,
        NgUploaderModule,
    ],
    exports :[
        FileUploadComponent,
    ]
})
export class FileUploadModule {

}
