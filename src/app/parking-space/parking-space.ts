import {PendingDriver} from "app/pending-drivers/pending-driver";
import {isNull} from "util";

export class ParkingSpace {

  constructor(public shape: string,
              public x: number,
              public y: number,
              public width: number,
              public height: number,
              public angle: number,
              public id: number,
              public occupied: boolean = false,
              public tooltipAssignedDriver: string = "Free",
              public reservation: number = 0,
              public driver: PendingDriver = null) {
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
    if (!this.occupied)
      this.deoccupy();
  }

  applyScale(scale) {
    this.x = this.x * scale;
    this.y = this.y * scale;
    this.height = this.height * scale;
    this.width = this.width * scale;

    return this;
  }

  assign(selectedDriver: PendingDriver) {
    this.driver = selectedDriver;
    this.changeTooltip();
  }

  deoccupy() {
    this.driver = null;
    this.changeTooltip();
  }

  changeTooltip(){
    if(!isNull(this.driver))
      this.tooltipAssignedDriver = `Reservation: ${this.reservation}\n Driver: ${this.driver.full_name} \nPlate: ${this.driver.vehicle.plate}`;
    else
      this.tooltipAssignedDriver = "Free"
  }

  setReservation(id : number, floor : number) {
    this.reservation = id;
    this.updateGarage(floor);

  }

  private updateGarage(floor : number) {
    const garage = JSON.parse(localStorage.getItem("garage"));
    garage['layouts'][floor] = this.updateOccupancy(garage, floor);
    localStorage.setItem("garage", JSON.stringify(garage));
  }

  private updateOccupancy(garage, floor){
    debugger;
    garage['layouts'][floor].map(parkingSpace =>
    { if(parkingSpace.id === this.id) parkingSpace['occupied'] = true; });
  }
}
