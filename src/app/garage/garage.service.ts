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
    return [new Amenity('bici', 'Bicicleta'), new Amenity('auto', 'Auto'),
      new Amenity('camioneta', 'Camioneta'), new Amenity('llaves', 'Llaves'),
      new Amenity('lavado', 'Lavado'), new Amenity('inflador', 'Inflador'),
      new Amenity('hours_24', '24 horas'), new Amenity('techado', 'Techado'), new Amenity('manejan', 'Manejan')];
  }

}
