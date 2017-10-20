import {ParkingSpace} from '../parking-space/parking-space';

export class Floor {
  constructor(public floorLevel: number,
              public parkingSpaces: Array<ParkingSpace>) {
    this.floorLevel = floorLevel;
    this.parkingSpaces = parkingSpaces;
  }

  public applyScaleToParkingSpaces(scale) {
    this.parkingSpaces = this.parkingSpaces.map(space => space.applyScale(scale));
    return this;
  }
}
