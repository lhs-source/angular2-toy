import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CssComponent } from './css.component';
import { CssBasicComponent } from './css-basic.component';
import { Css3Component } from './css-3.component';

@NgModule({
    declarations: [
      CssComponent,
      CssBasicComponent,
      Css3Component,
    ],
    imports : [ BrowserModule,
                FormsModule ],
    providers: [ ],
    bootstrap: [ ],
  })
  export class CssModule { }
