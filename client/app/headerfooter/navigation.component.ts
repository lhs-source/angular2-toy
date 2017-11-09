
import { Component, Input, Output, EventEmitter } from '@angular/core'

import { AuthGuardAdmin } from '../user/auth-guard-admin.service';
import { AuthGuardLogin } from '../user/auth-guard-login.service';
import { AuthService } from '../user/auth.service';



@Component({
    selector: 'app-nav',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent{
    @Input('toggle') isNavActive : boolean = false;
    @Output()
    toggleFromNav : EventEmitter<number> = new EventEmitter<number>();

    isLoggedIn : boolean;
    isAdmin : boolean;

    constructor(private auth : AuthService, private login : AuthGuardLogin, private admin : AuthGuardAdmin){
        this.isLoggedIn = this.getlogin();
        this.isAdmin = this.getadmin();
    };
    getlogin() : boolean{
        return this.auth.loggedIn;
    }
    getadmin() : boolean{
        return this.auth.loggedIn;
    }
    toggleNav(){
        this.isNavActive = !this.isNavActive;
        this.toggleFromNav.emit();
    }
}