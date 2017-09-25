import {Component} from '@angular/core';
import {LoginService} from '../login/login.service';
import {NotificationsService} from '../notifications/notifications.service';
import {Router, CanActivate} from '@angular/router';

@Component({
  selector: 'myAccount',
  templateUrl: './myAccount.component.html',
  styleUrls: ['./myAccount.component.css'],
  providers: [NotificationsService]
})

export class MyAccountComponent {
  constructor(private loginService: LoginService,
              private notificationsService: NotificationsService,
              private router: Router) {}

}
