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
    // nav가 켜졌는지, 꺼졌는지, appheader와 동일하게 유지할 것
    isNavActive : boolean = false;

    constructor(private router : Router, private auth : AuthService, private login : AuthGuardLogin, private admin : AuthGuardAdmin){
        
    };

    toggleNav():void{
        this.isNavActive = !this.isNavActive;
    }
    getlogin() : boolean{
        return this.auth.loggedIn;
    }
    getadmin() : boolean{
        return this.auth.loggedIn;
    }
}