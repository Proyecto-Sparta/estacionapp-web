import {Injectable} from "@angular/core";
import {Garage} from "../garage/garage";
import {Headers, Http, JsonpModule, RequestOptions} from "@angular/http";
import {Router} from "@angular/router";
import {isNull} from "util";

@Injectable()
export class LoginService {
  private garageUrl = 'http://localhost:4000/api/garage';

  constructor(private http: Http,
              private router: Router) {

  }

  generateHeaders(garage: Garage) {
    const encodedGarage = btoa(`${garage.username}:${garage.password}`);
    const headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
    headers.append('Authorization', `Basic ${encodedGarage}`);
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    return headers;
  }

  handleLoginError() {
    return this.router.navigate(['/login']);
  }

  login(garage: Garage) {
    const options = new RequestOptions({headers: this.generateHeaders(garage)});
    const url = `${this.garageUrl}/login`;
    return this.http.get(url, options).subscribe(
      response => {
        localStorage.setItem('currentUser',
          JSON.stringify({
            username: garage.username,
            token: response.headers.get('authorization')
          }));
        return this.router.navigate(['/dashboard']);
      },
      error => this.handleLoginError())
  };

  isLogged() {
    return ! isNull(JSON.parse(localStorage.getItem('currentUser')));
  }


}

