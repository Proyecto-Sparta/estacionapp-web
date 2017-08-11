import {Component, OnInit} from '@angular/core';
import {Garage} from '../garage/garage';
import {NgForm} from '@angular/forms';
import {GarageService} from '../garage/garage.service';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [GarageService]
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    if(this.loginService.isLoggedIn())
      this.router.navigate(['/home']);
  }

  model = new Garage('Garage', 'password');
  validUser = true;

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  onSubmit(loginForm: NgForm) {
    this.loginService.login(new Garage(
      loginForm.value.username,
      loginForm.value.password), this)
      .subscribe(
        (token: any) => this.router.navigate(['/home']),
        () => { this.makeInvalid(); }
      );
  }

  makeInvalid() {
    this.validUser = false;
  }

  makeValid() {
    this.validUser = true;
  }
}
