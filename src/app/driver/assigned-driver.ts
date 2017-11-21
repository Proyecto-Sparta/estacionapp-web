import {Vehicle} from "../vehicle/vehicle";

export class AssignedDriver {
  constructor(public id: number,
              public email: string,
              public fullName: string,
              public vehicle: Vehicle) {
  }
}
