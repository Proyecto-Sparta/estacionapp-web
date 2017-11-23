import {Injectable} from "@angular/core";
import {SignupModel} from "./signup";
import {Garage} from "../garage/garage";
import {LoginService} from "../login/login.service";
import {Http} from "@angular/http";
import { environment } from "environments/environment";

@Injectable()
export class SignupService {

  private garageUrl = `${environment.backendURL}/api/garages`;

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
