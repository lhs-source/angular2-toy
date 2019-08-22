import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CssComponent } from './css.component';
import { CssBasicComponent } from './css-basic.component';
import { Css3Component } from './css-3.component';
import { CSSUsageComponent } from './css-usage.component';
import { CSSTimelineComponent } from './css-timeline.component';
import { CSSTimeline2Component } from './css-timeline.component2';

@NgModule({
    declarations: [
      CssComponent,
      CssBasicComponent,
      Css3Component,
      CSSUsageComponent,
      CSSTimelineComponent,
      CSSTimeline2Component,
    ],
    imports : [ BrowserModule,
                FormsModule ],
    providers: [ ],
    bootstrap: [ ],
  })
  export class CssModule { }

