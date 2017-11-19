import {ParkingSpace} from '../parking-space/parking-space';

export class Floor {
  constructor(public floorLevel: number,
              public id: number = null,
              public parkingSpaces: Array<ParkingSpace> = []) {
    this.id = id;
    this.floorLevel = floorLevel;
    this.parkingSpaces = parkingSpaces;
  }

  public applyScaleToParkingSpaces(scale) {
    this.parkingSpaces = this.parkingSpaces.map(space => space.applyScale(scale));
    return this;
  }

  public hasParkingSpaces(){
    return this.parkingSpaces.length > 0;
  }

  public removeParkingSpace(index) {
    this.parkingSpaces = this.parkingSpaces.filter((p, i) => i !== index);
    return this;
  }
}
