import {Injectable} from "@angular/core";
import {GarageService} from "../garage/garage.service";

@Injectable()
export class DashboardService {

  constructor(private garageService : GarageService){}

  public getVehicle(type : string){
    return this.garageService.getGarage()['layouts']
      .map(layout => layout['reservations']
        .filter(reservation => reservation.driver.vehicle.type === type).length)
      .reduce((a, b) => a + b);

  }


  public getOccupancies(){
    return this.garageService.getGarage()['layouts'].map(layout => layout['reservations'].length)
      .reduce((a, b) => a + b);
  }


  public getTotalParkingSpaces(){
    return this.garageService.getGarage()['layouts'].map(layout => layout['parking_spaces'].length)
      .reduce((a, b) => a + b)
  }

  public getPercentage(){
    return (this.getOccupancies() / this.getTotalParkingSpaces()) * 100 || 0;
  }

}