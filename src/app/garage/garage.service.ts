import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {Amenity} from "./amenity";
import {ParkingSpace} from "../parking-space/parking-space";
import {Reservation} from "../floors/reservation";
import {AssignedDriver} from "../driver/assigned-driver";
import {Vehicle} from "../vehicle/vehicle";
import {ConvertersService} from "./converters.service";

@Injectable()
export class GarageService {
  private garageUrl = 'http://localhost:4000/api/garage';

  constructor(private http: Http,
              private router: Router,
              private converters : ConvertersService) {

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
