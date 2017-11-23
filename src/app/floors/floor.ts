import {ParkingSpace} from '../parking-space/parking-space';
import {Reservation} from "./reservation";

export class Floor {
  constructor(public floorLevel: number,
              public id: number = null,
              public parkingSpaces: Array<ParkingSpace> = [],
              public reservations : Array<Reservation> = []) {
    this.id = id;
    this.floorLevel = floorLevel;
    this.parkingSpaces = parkingSpaces;
  }

  public applyScaleToParkingSpaces(scale) {
    return this;
  }

  public hasParkingSpaces(){
    return this.parkingSpaces.length > 0;
  }

  public removeParkingSpace(index) {
    this.parkingSpaces = this.parkingSpaces.filter((p, i) => i !== index);
    return this;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setParkingSpaces(parkingSpaces: Array<ParkingSpace>) {
    this.parkingSpaces = parkingSpaces;
  }
}
