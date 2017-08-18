import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuardLogin implements CanActivate {

  constructor(public auth: AuthService, private router: Router) {}

  canActivate() {
    let allow = this.auth.loggedIn;
    console.log("auth guard login " + allow);
    if(!allow){
      this.router.navigate(['/login']);
    }
    return allow;
  }
}
