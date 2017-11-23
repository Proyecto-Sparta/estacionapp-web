import {Vehicle} from "../vehicle/vehicle";

export class AssignedDriver {
  constructor(public id: number,
              public email: string,
              public fullName: string,
              public vehicle: Vehicle) {
  }

  mapToRequest() {
    return {
      id : this.id,
      email : this.email,
      full_name : this.fullName,
      vehicle : {
        type : this.vehicle.type,
        plate : this.vehicle.plate
      }

    }
  }
}
