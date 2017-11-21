import {PendingDriver} from "app/pending-drivers/pending-driver";
import {isNull} from "util";
import {AssignedDriver} from "../driver/assigned-driver";

export class ParkingSpace {

  constructor(public shape: string,
              public x: number,
              public y: number,
              public width: number,
              public height: number,
              public angle: number,
              public id: number = null,
              public occupied: boolean = false) {
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
    this.x = +(this.x * scale).toFixed(0);
    this.y = +(this.y * scale).toFixed(0);
    this.height = +(this.height * scale).toFixed(0);
    this.width = +(this.width * scale).toFixed(0);

    return this;
  }

  assign(selectedDriver: PendingDriver) {
  //  this.driver = selectedDriver;
 //   this.changeTooltip();
  }

  deoccupy() {
 //   this.driver = null;
  //  this.changeTooltip();
  }
/*
  changeTooltip(){
    if(!isNull(this.driver))
      this.tooltipAssignedDriver = `Driver: ${this.driver.full_name} \nPlate: ${this.driver.vehicle.plate}`;
    else
      this.tooltipAssignedDriver = "Free"
  } */

  public updateGarage(floor : number) {
    const garage = JSON.parse(localStorage.getItem("garage"));
    garage['layouts'][floor]['parking_spaces'] = this.updateOccupancy(garage, floor);
    localStorage.setItem("garage", JSON.stringify(garage));
    return garage;
  }

  private updateOccupancy(garage, floor){
    let parkingSpaces = garage['layouts'][floor].parking_spaces;
    parkingSpaces.forEach(parkingSpace =>
    { delete parkingSpace["occupied?"];
      if(parkingSpace.id === this.id) parkingSpace['occupied'] = true;
    });
    return parkingSpaces;
  }
}
