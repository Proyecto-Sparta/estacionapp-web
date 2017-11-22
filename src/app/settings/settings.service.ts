import {SettingsModel} from "./settings";
import {Pricing} from "../garage/pricing";
import {AmenityCheckbox} from "../signup/signup";
import {GarageService} from "../garage/garage.service";
import {Injectable} from "@angular/core";

@Injectable()
export class SettingsService {

  constructor(public garageService : GarageService){}

  mapToSettingsModel(garage: Object): SettingsModel {
    return new SettingsModel(garage['username'],
      garage['name'],
      garage['email'],
      this.mapFromPricingObject(garage['pricing']),
      this.mapFromAmenitiesObject(garage['amenities']));
  }


  private mapFromPricingObject(pricing: Object) : Pricing {
    return new Pricing(pricing['bike'], pricing['car'], pricing['pickup']);
  }

  private mapFromAmenitiesObject(amenities : Array<string>) : Array<AmenityCheckbox> {
    return this.garageService.getAmenities()
      .map(amenity => new AmenityCheckbox(amenity, amenities.includes(amenity.keyword)));

  }
}
