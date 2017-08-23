import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ThreadComponent } from './thread.component';
import { ThreadDetailComponent } from './thread-detail.component';
import { ThreadListComponent } from './thread-list.component';
import { ThreadCategoryComponent } from './thread-category.component';
import { ThreadAddComponent } from './thread-add.component';

import { ThreadService } from './thread.service';

@NgModule({
    declarations: [
        ThreadComponent,
        ThreadDetailComponent,
        ThreadListComponent,
        ThreadCategoryComponent,
        ThreadAddComponent,
    ],
    imports :[
        BrowserModule,
        FormsModule,
        //ThreadRoutingModule,
        RouterModule,
        ReactiveFormsModule,
    ],
    providers : [
        ThreadService
    ]
})
export class ThreadModule{

}