import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Notification} from '../notifications/notification';

@Injectable()
export class NotificationsService {
  private notificationsUrl = 'http://localhost:4200';
  private refreshPeriod = 3000;

  constructor(private http: Http) {
  }

  public getNotificationsObservable(garageId: Number) {
    return Observable
      .interval(this.refreshPeriod)
      .switchMap(_ => this.http.get(this.notificationsUrl))
      .map(data => new Notification(Notification.driverOnTheWay, 123)); // (Mocked)
  }
}
