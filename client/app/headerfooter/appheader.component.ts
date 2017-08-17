import { Component, Output, EventEmitter } from '@angular/core';

import { AuthGuardAdmin } from '../user/auth-guard-admin.service';
import { AuthGuardLogin } from '../user/auth-guard-login.service';

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