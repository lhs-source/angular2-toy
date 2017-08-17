import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector : "app-header",
    templateUrl : "./appheader.component.html",
    styleUrls : ["./appheader.component.css"],

})
export class AppHeaderComponent {
    @Output() navActive = new EventEmitter();
    toggleNav():void{
        this.navActive.emit();
    }
}