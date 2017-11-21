import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {PendingDriver} from "./pending-driver";
import {Observable} from "rxjs/Observable";
import {AssignedDriversService} from "../driver/assigned-drivers.service";
import {ParkingSpace} from "../parking-space/parking-space";
import {Floor} from "../floors/floor";

@Injectable()
export class PendingDriversService {

  private pendingDrivers: Observable<PendingDriver[]>;
  private currentId = JSON.parse(localStorage.getItem('garage')).id;
  private garagePath = `garages/${this.currentId}`;

  constructor(private db: AngularFireDatabase, private assignedDriversService : AssignedDriversService) {
    this.pendingDrivers = db.list(this.garagePath).valueChanges();
  }

  public getDrivers() {
    return this.pendingDrivers;
  }

  public assign(parkingSpace: ParkingSpace, driver: PendingDriver, currentFloor: Floor) {
    this.db.database.ref(`drivers/${driver.id}`).update(
      {
        floor: currentFloor.floorLevel,
        garage: this.currentId,
        parkingSpace: parkingSpace.id,
        isAccepted: true,
        full_name: driver.full_name,
        vehicle: driver.vehicle
      }
    )
      .then(_ => {
     //   this.removePendingDriver(driver.id);
        this.assignedDriversService.makeReservation(driver, parkingSpace, currentFloor)})
      .catch(response => console.error(response));
  }


  removePendingDriver(id: string): any {
    console.log(`garage: ${this.garagePath} and child ${id}`);
    this.db.database.ref(this.garagePath).child(id).remove()
      .catch(response => console.error(response));
  }

  deny(driver : PendingDriver) {
    this.db.database.ref(`drivers/${driver.id}`).update(
      {
        garage: this.currentId,
        isAccepted: false,
      }
    )
      .then(_ => {
      //  this.removePendingDriver(driver.id);
      })
      .catch(response => console.error(response));
  }
}
