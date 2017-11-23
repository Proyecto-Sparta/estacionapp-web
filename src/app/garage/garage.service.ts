import {Injectable} from '@angular/core';
import {Amenity} from "./amenity";
import {ParkingSpace} from "../parking-space/parking-space";
import {ConvertersService} from "./converters.service";

@Injectable()
export class GarageService {
  constructor(private converters : ConvertersService) {

  }


  public getAmenities(): Array<Amenity> {
    return [new Amenity(0, 'bici', 'Bicicleta'), new Amenity(1, 'auto', 'Auto'),
      new Amenity(2, 'camioneta', 'Camioneta'), new Amenity(3, 'llaves', 'Llaves'),
      new Amenity(4, 'lavado', 'Lavado'), new Amenity(5, 'inflador', 'Inflador'),
      new Amenity(6, 'hours_24', '24 horas'), new Amenity(7, 'techado', 'Techado'), new Amenity(8, 'manejan', 'Manejan')];
  }

  public setGarage(response: Object) {
    localStorage.setItem('garage', JSON.stringify(response));
  }

  public getGarage(){
    return JSON.parse(localStorage.getItem('garage'));
  }

  findReservationFor(parkingSpace: ParkingSpace, floor : number) {
    return this.getGarage()['layouts'][floor]['reservations']
      .map(reservation => this.converters.mapObjectToReservation(reservation))
      .find(reservation => reservation.parkingSpaceId === parkingSpace.id);
  }

}
