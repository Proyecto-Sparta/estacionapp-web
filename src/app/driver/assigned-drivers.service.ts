import {Injectable} from '@angular/core';
import {PendingDriver} from "../pending-drivers/pending-driver";
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {ParkingSpace} from "../parking-space/parking-space";
import {GarageLayoutService} from "../garage/garageLayout.service";
import {Floor} from "../floors/floor";
import { environment } from 'environments/environment';
import {Reservation} from "../floors/reservation";

@Injectable()
export class AssignedDriversService {
  private reservationsUrl = `${environment.backendURL}/api/reservations`;

  constructor(private http: Http, private layoutService : GarageLayoutService) {

  }

  generateHeaders() {
    const headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
    headers.append('authorization', localStorage.getItem('token'));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  makeReservation(driver: PendingDriver, parkingSpace: ParkingSpace, floor: Floor) : any {
  const options = new RequestOptions({headers: this.generateHeaders()});
  return this.http
    .post(this.reservationsUrl, {
      "driver_id" : driver.id,
      "garage_layout_id" : floor.id,
      "parking_space_id" : parkingSpace.id
    }, options)
    .map(response => response.json())
    .subscribe(() => this.layoutService.updateFloor(floor));
  }

  deleteReservation(reservation : Reservation, floor : Floor) {
    const options = new RequestOptions({headers: this.generateHeaders()});
    return this.http
      .put(`${this.reservationsUrl}/${reservation.id}`, { valid : false }, options)
      .map(response => response.json())
      .subscribe(() => this.layoutService.updateFloor(floor));
  }
}
