import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class NotificationsService {
  private notificationsUrl = 'http://localhost:4000/api/notifications';

  constructor(private http: Http) {

  }

}
