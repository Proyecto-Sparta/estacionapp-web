import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Notification} from '../notifications/notification';
import {Observable} from "rxjs/Observable";

@Injectable()
export class NotificationsService {
  private notificationsUrl = 'http://localhost:4200';
  private notificationsObs: Observable<Notification>;
  private notifications: Array<String> = [];

  constructor(private http: Http) {
  }

  public getNotificationsObservable(garageId: String) {
    return this.http.get(this.notificationsUrl)
      .map(data => new Notification(Notification.driverOnTheWay, garageId));
  }

  public pushNotification(garageId: String){
    this.notificationsObs = this.getNotificationsObservable(garageId);
    this.notificationsObs.subscribe(notification => {
      const notificationText = this.processNotification(notification);
      this.notifications.push(notificationText);
    });
  }

  private processNotification(notification) {
    switch (notification.type) {
      case Notification.driverOnTheWay:
        return 'New driver on the way!';
      default:
        return 'Other notification';
    }
  }
}
