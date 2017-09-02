import {Component} from '@angular/core';
import {LoginService} from '../login/login.service';
import {Router, CanActivate} from '@angular/router';

@Component({
  selector: 'myAccount',
  templateUrl: './myAccount.component.html',
  styleUrls: ['./myAccount.component.css']
})

export class MyAccountComponent {
  constructor(private loginService: LoginService,
              private router: Router) {}

}
