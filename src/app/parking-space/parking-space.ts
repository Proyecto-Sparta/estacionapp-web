import {Reservation} from "../floors/reservation";

export class ParkingSpace {

  constructor(public shape: string,
              public x: number,
              public y: number,
              public width: number,
              public height: number,
              public angle: number,
              public id: number = null,
              public occupied: boolean = false,
              public reservation : Reservation = null) {
    this.shape = shape;
    this.x = x;
    this.y = y;
    this.id = id;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.occupied = occupied;
  }

  updatePosition(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  toggleOccupancy() {
    this.occupied = !this.occupied;
    return this.occupied;
  }

  applyScale(scale) {
    this.x = +(this.x * scale).toFixed(0);
    this.y = +(this.y * scale).toFixed(0);
    this.height = +(this.height * scale).toFixed(0);
    this.width = +(this.width * scale).toFixed(0);

    return this;
  }

  assign(reservation : Reservation) {
    this.reservation = reservation;
  }

  deoccupy() {
    this.reservation = null;
  }

  getTooltip(){
    if(!this.reservation){
      if(this.occupied)
        return "Ocupado";
      return "Libre";
    }
    else
      return `Nombre: ${this.reservation.driver.fullName} \nMatricula: ${this.reservation.driver.vehicle.plate}`;
  }

}
