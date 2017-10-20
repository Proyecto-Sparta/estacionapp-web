import {Component} from '@angular/core';
import {LoginService} from '../login/login.service';
import {Router, CanActivate} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  constructor(private loginService: LoginService,
              private router: Router) {}

}

