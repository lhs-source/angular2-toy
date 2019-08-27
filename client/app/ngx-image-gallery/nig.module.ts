import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// import 'hammerjs';

import {NgxImageGalleryComponent} from './nig.component';
import {ClickOutsideDirective} from './click-outside.directive';
import {MouseWheelDirective} from './mousewheel.directive';

export * from './nig.component';
export * from './click-outside.directive';
export * from './mousewheel.directive';
export * from './nig.conf';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NgxImageGalleryComponent,
        MouseWheelDirective,
        ClickOutsideDirective
    ],
    exports: [
        NgxImageGalleryComponent,
        MouseWheelDirective,
        ClickOutsideDirective
    ]
})
export class NgxImageGalleryModule {
}