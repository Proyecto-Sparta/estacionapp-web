import {Injectable} from '@angular/core';
import {PendingDriver} from "../pending-drivers/pending-driver";
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {ParkingSpace} from "../parking-space/parking-space";
import {GarageService} from "../garage/garage.service";
import {GarageLayoutService} from "../garage/garageLayout.service";

@Injectable()
export class AssignedDriversService {
  private reservationsUrl = 'http://localhost:4000/api/reservations';

  constructor(private http: Http, private layoutService : GarageLayoutService) {

  }

  generateHeaders() {
    const headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
    headers.append('authorization', localStorage.getItem('token'));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  makeReservation(driver: PendingDriver, parkingSpace: ParkingSpace, currentFloor: number) : any {
  const options = new RequestOptions({headers: this.generateHeaders()});
  return this.http
    .post(this.reservationsUrl, {
      "driver_id" : driver.id,
      "garage_layout_id" : this.getLayoutId(currentFloor),
      "parking_space_id" : parkingSpace.id
    }, options)
    .map(response => response.json().id)
    .subscribe((reservation) =>  {
    debugger;
      let garage = parkingSpace.updateGarage(currentFloor);
      this.layoutService.updateLayout(garage['layouts'][currentFloor]);
  });
  }

  private getLayoutId(currentFloor: number) : number {
    return JSON.parse(localStorage.getItem('garage')).layouts[currentFloor].id;
  }
}
