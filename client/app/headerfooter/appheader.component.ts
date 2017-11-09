import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthGuardAdmin } from '../user/auth-guard-admin.service';
import { AuthGuardLogin } from '../user/auth-guard-login.service';
import { AuthService } from '../user/auth.service';

@Component({
    selector : "app-header",
    templateUrl : "./appheader.component.html",
    styleUrls : ["./appheader.component.css"],

})
export class AppHeaderComponent {
    @Output() navActive = new EventEmitter();

    isLoggedIn : boolean;
    isAdmin : boolean;

    constructor(private router : Router, private auth : AuthService, private login : AuthGuardLogin, private admin : AuthGuardAdmin){
        this.isLoggedIn = this.getlogin();
        this.isAdmin = this.getadmin();
    };

    toggleNav():void{
        this.navActive.emit();
    }
    getlogin() : boolean{
        return this.auth.loggedIn;
    }
    getadmin() : boolean{
        return this.auth.loggedIn;
    }
}