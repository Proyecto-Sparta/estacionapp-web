import {Component} from '@angular/core';
import {LoginService} from '../login/login.service';
import {NotificationsService} from '../notifications/notifications.service';
import {Router, CanActivate} from '@angular/router';
import {Notification} from '../notifications/notification';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'myAccount',
  templateUrl: './myAccount.component.html',
  styleUrls: ['./myAccount.component.css'],
  providers: [NotificationsService]
})

export class MyAccountComponent {

  private notificationsObs: Observable<Notification>;

  constructor(private loginService: LoginService,
              private notificationsService: NotificationsService,
              private router: Router) {
    this.notificationsObs = notificationsService.getNotificationsObservable(666);
    this.notificationsObs.subscribe(data => console.log(data));
  }

}
