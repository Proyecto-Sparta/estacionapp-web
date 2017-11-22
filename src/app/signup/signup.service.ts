import {Injectable} from "@angular/core";
import {SignupModel} from "./signup";
import {Garage} from "../garage/garage";
import {LoginService} from "../login/login.service";
import {Http} from "@angular/http";

@Injectable()
export class SignupService {

  private garageUrl = 'http://localhost:4000/api/garages';

  constructor(private loginService : LoginService, private http : Http){

  }

  public signup(model : SignupModel){
    const url = `${this.garageUrl}`;
    return this.http
      .post(url, model.mapToRequest())
      .toPromise()
      .then( (response) => this.loginService.login(new Garage(model.username, model.password)));
  }





}
