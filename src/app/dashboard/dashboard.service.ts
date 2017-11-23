import {Injectable} from "@angular/core";
import {GarageService} from "../garage/garage.service";

@Injectable()
export class DashboardService {

  constructor(private garageService : GarageService){}

  public getVehicle(type : string){
    return this.garageService.getGarage()['layouts']
      .map(layout => layout['reservations']
        .filter(reservation => reservation.driver.vehicle.type === type).length)
      .reduce((a, b) => a + b, 0);

  }


  public getOccupancies(){
    return this.garageService.getGarage()['layouts'].map(layout =>
      layout.parking_spaces.filter(parkingSpace => parkingSpace.occupied).length)
      .reduce((a, b) => a + b, 0);
  }


  public getTotalParkingSpaces(){
    return this.garageService.getGarage()['layouts'].map(layout => layout['parking_spaces'].length)
      .reduce((a, b) => a + b, 0)
  }

  public getPercentage(){
    return parseFloat(((this.getOccupancies() / this.getTotalParkingSpaces())* 100).toFixed(2))  || 0;
  }

}
