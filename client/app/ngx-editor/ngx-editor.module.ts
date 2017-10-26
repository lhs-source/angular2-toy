import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEditorComponent } from './ngx-editor.component';
import { NgxGrippieComponent } from './ngx-grippie/ngx-grippie.component';

import { FileUploadModule } from '../wysiwyg/file/file-upload.module';

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule
  ],
  declarations: [
    NgxEditorComponent,
    NgxGrippieComponent,
  ],
  exports: [
    NgxEditorComponent,
    NgxGrippieComponent
  ]
})

export class NgxEditorModule { }
