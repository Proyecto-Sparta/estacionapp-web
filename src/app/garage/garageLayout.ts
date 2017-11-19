import {Point} from '../layout/point';
import {Floor} from '../floors/floor';

export class GarageLayout {
  shape: Array<Point>;
  floors: Array<Floor>;

  constructor(shape: Array<Point>, floors: Array<Floor>) {
    this.shape = shape;
    this.floors = floors;
    console.log("Saved "+floors.length +" floors");
  }

  applyScale(scale) {
    this.shape = this.shape.map(point => point.applyScale(scale));
    this.floors = this.floors.map(floor => floor.applyScaleToParkingSpaces(scale));
    return this;
  }
}
