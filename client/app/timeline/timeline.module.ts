import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgxImageGalleryModule } from "../ngx-image-gallery/nig.module";

import { CSSTimelineComponent } from './css-timeline.component';
import { CSSTimeline2Component } from './css-timeline.component2';
import { TimelineComponent } from './timeline.component';


@NgModule({
    declarations: [
      CSSTimelineComponent,
	  CSSTimeline2Component,
	  TimelineComponent,
    ],
    imports : [ BrowserModule,
                FormsModule,
                NgxImageGalleryModule ],
    providers: [ ],
    bootstrap: [ ],
  })
  export class TimelineModule { }

