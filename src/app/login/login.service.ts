import {Injectable} from '@angular/core';
import {Garage} from '../garage/garage';
import {Headers, Http, RequestOptions} from '@angular/http';
import {LoginComponent} from './login.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService {
  private garageUrl = 'http://localhost:4000/api/garages';

  constructor(private http: Http) {

  }

  generateHeaders(garage: Garage) {
    const encodedGarage = btoa(`${garage.username}:${garage.password}`);
    const headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
    headers.append('Authorization', `Basic ${encodedGarage}`);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  login(garage: Garage) {
    const options = new RequestOptions({headers: this.generateHeaders(garage)});
    const url = `${this.garageUrl}/login`;
    return this.http
      .post(url, {}, options)
      .toPromise()
      .then( (response) => {
        let currentGarage = response.json();
        currentGarage['layouts'] = currentGarage['layouts'].sort((floor, otherFloor) => floor.floor_level > otherFloor.floor_level);
        localStorage.setItem('currentUser', garage.username);
        localStorage.setItem('garage', JSON.stringify(currentGarage));
        localStorage.setItem('token', response.headers.get('authorization'));
      });
  }


  logout() {
    localStorage.clear();
    return Observable.of(true);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
