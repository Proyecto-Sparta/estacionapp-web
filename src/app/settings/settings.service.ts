import {SettingsModel} from "./settings";
import {Pricing} from "../garage/pricing";
import {AmenityCheckbox} from "../signup/signup";
import {GarageService} from "../garage/garage.service";
import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import { environment } from 'environments/environment';

@Injectable()
export class SettingsService {

  private garageUrl = `${environment.backendURL}/api/garages`;

  constructor(public garageService : GarageService, private http : Http){}

  private getId(){
    return JSON.parse(localStorage.getItem('garage'))['id'];
  }


  generateHeaders() {
    const headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
    headers.append('authorization', localStorage.getItem('token'));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  mapToSettingsModel(garage: Object): SettingsModel {
    return new SettingsModel(
      garage['name'],
      garage['email'],
      this.mapFromPricingObject(garage['pricing']),
      this.mapFromAmenitiesObject(garage['amenities']));
  }


  private mapFromPricingObject(pricing: Object) : Pricing {
    return new Pricing(pricing['bike'], pricing['car'], pricing['pickup'], pricing['id']);
  }

  private mapFromAmenitiesObject(amenities : Array<string>) : Array<AmenityCheckbox> {
    return this.garageService.getAmenities()
      .map(amenity => new AmenityCheckbox(amenity, amenities.includes(amenity.keyword)));

  }

  save(model: SettingsModel) {
    const options = new RequestOptions({headers: this.generateHeaders()});
    const url = `${this.garageUrl}`;
    return this.http
      .patch(url, model.mapToRequest(), options)
      .map(response => response.json())
      .toPromise();
  }
}
