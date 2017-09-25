import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Notification} from '../notifications/notification';

@Injectable()
export class NotificationsService {
  private notificationsUrl = 'http://localhost:4200';

  constructor(private http: Http) {
  }

  public getNotificationsObservable(garageId: Number) {
    return this.http.get(this.notificationsUrl)
      .map(data => new Notification(Notification.driverOnTheWay, 123));
  }
}
