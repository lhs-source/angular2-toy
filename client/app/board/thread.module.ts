import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ThreadComponent } from './thread.component';
import { ThreadDetailComponent } from './thread-detail.component';
import { ThreadListComponent } from './thread-list.component';
import { ThreadCategoryComponent } from './thread-category.component';
import { ThreadAddComponent } from './thread-add.component';
import { ThreadEditComponent } from './thread-edit.component';

import { ThreadDetailCommentsComponent } from './thread-detail-comments.component';

import { ThreadService } from './thread.service';

import { SafeHtmlPipe } from '../wysiwyg/ww-safehtml.pipe';
import { GlobalModule } from '../global.module';

import { NgxEditorModule } from '../ngx-editor/ngx-editor.module';


@NgModule({
    declarations: [
        ThreadComponent,
        ThreadDetailComponent,
        ThreadListComponent,
        ThreadCategoryComponent,
        ThreadAddComponent,
        ThreadEditComponent,
        ThreadDetailCommentsComponent,
    ],
    imports :[
        BrowserModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        GlobalModule,
        NgxEditorModule
    ],
    providers : [
        ThreadService,
    ]
})
export class ThreadModule{

}