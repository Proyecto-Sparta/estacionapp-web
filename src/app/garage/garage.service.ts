import {Injectable} from '@angular/core';
import {Amenity} from "./amenity";
import {ParkingSpace} from "../parking-space/parking-space";
import {ConvertersService} from "./converters.service";

@Injectable()
export class GarageService {
  constructor(private converters : ConvertersService) {

  }

  public getAmenities(): Array<Amenity> {
    return [
      new Amenity(1, 'bici', 'Bicicleta'),
      new Amenity(2, 'auto', 'Auto'),
      new Amenity(3, 'camioneta', 'Camioneta'),
      new Amenity(4, 'llaves', 'Llaves'),
      new Amenity(5, 'lavado', 'Lavado'),
      new Amenity(6, 'inflador', 'Inflador'),
      new Amenity(7, 'hours_24', '24 horas'),
      new Amenity(8, 'techado', 'Techado'),
      new Amenity(9, 'manejan', 'Manejan')
    ];
  }

  public setGarage(response: Object) {
    localStorage.setItem('garage', JSON.stringify(response));
  }

  public getGarage(){
    return JSON.parse(localStorage.getItem('garage'));
  }

  findReservationFor(parkingSpace: ParkingSpace, floor : number) {
    let reservation = this.getGarage()['layouts'][floor]['reservations']
      .map(reservation => this.converters.mapObjectToReservation(reservation))
      .find(reservation => reservation.parkingSpaceId === parkingSpace.id);
    return reservation;
  }

}
