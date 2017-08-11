import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login/login.service';
import {Router} from '@angular/router';

@Component({
  template: ''
})

export class LogoutComponent implements OnInit {
  constructor(private loginService: LoginService,
              private router: Router) {}

  ngOnInit() {
    this.loginService.logout()
      .subscribe(
        () => this.router.navigate(['/login']),
      );
  }
}

