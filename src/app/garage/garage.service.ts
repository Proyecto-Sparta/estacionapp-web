import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {Amenity} from "./amenity";

@Injectable()
export class GarageService {
  private garageUrl = 'http://localhost:4000/api/garage';

  constructor(private http: Http,
              private router: Router) {

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
}
