import {Injectable} from '@angular/core';
import {PendingDriver} from "../pending-drivers/pending-driver";
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AssignedDriversService {
  private reservationsUrl = 'http://localhost:4000/api/reservations';

  constructor(private http: Http) {

  }

  generateHeaders() {
    const headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
    headers.append('authorization', localStorage.getItem('token'));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  makeReservation(driver: PendingDriver, parkingSpace: number, currentFloor: number) : any {
  const options = new RequestOptions({headers: this.generateHeaders()});
  return this.http
    .post(this.reservationsUrl, {
      "driver" : driver.id,
      "garage_layout" : JSON.parse(localStorage.getItem("garage")).layouts,
      "parking_space_id" : parkingSpace,
    }, options)
    .map(response =>response.json)
    .subscribe();
  }
}
