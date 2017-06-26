import {Injectable} from "@angular/core";
import {Garage} from "./garage";
import {Headers, Http, RequestOptions} from "@angular/http";

@Injectable()
export class GarageService {
  private garageUrl = 'http://localhost:4000/api/garage';

  constructor(private http: Http) {
  }

  login(garage: Garage) {
    let encodedGarage = btoa(`${garage.username}:${garage.password}`);
    let headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
    headers.append('Authorization', `Basic ${encodedGarage}`);
    let options = new RequestOptions({headers: headers});
    let url = `${this.garageUrl}/login`;
    return this.http.get(url, options).subscribe();
  }
}
