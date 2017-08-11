import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '../login/login.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthGuard implements CanActivateChild, CanActivate {

  constructor(private loginService: LoginService,
              private router: Router) {}

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.loginService.isLoggedIn();
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    return this.loginService.isLoggedIn();
  }
}
