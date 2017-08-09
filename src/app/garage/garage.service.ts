import {Injectable} from "@angular/core";
import {Garage} from "./garage";
import {Headers, Http, RequestOptions} from "@angular/http";
import {Router} from "@angular/router";

@Injectable()
export class GarageService {
  private garageUrl = 'http://localhost:4000/api/garage';

  constructor(
    private http: Http,
    private router : Router) {

  }

  }

