
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
    // nav가 켜졌는지, 꺼졌는지, appheader와 동일하게 유지할 것
    @Input('toggle') isNavActive : boolean = false;
    // nav에서 메뉴를 선택했을 때, appheader로 알리는 함수다.
    @Output() toggleFromNav : EventEmitter<number> = new EventEmitter<number>();

    constructor(private auth : AuthService, private login : AuthGuardLogin, private admin : AuthGuardAdmin){

    };
    getlogin() : boolean{
        return this.auth.loggedIn;
    }
    getadmin() : boolean{
        return this.auth.loggedIn;
    }
    toggleNav(){
        this.toggleFromNav.emit();
    }
}