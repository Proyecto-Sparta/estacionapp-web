import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot} from '@angular/router';
import {LoginService} from "../login/login.service";

@Injectable()
export class AuthGuard implements CanActivateChild {

  constructor(private loginService : LoginService){}

  canActivateChild(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) {
    return this.loginService.isLogged();
  }
}
