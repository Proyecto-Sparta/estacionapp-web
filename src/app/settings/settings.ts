import {AmenityCheckbox} from "../signup/signup";
import {Pricing} from "../garage/pricing";

export class SettingsModel {

  constructor(public name : string,
              public email : string,
              public pricing : Pricing,
              public amenities : Array<AmenityCheckbox>){}



  public mapToRequest(){
    return {
      id : JSON.parse(localStorage.getItem('garage'))['id'],
      name : this.name,
      email : this.email,
      pricing : this.pricing.mapToRequest(),
      amenities : this.amenities
        .filter(amenity => amenity.checked)
        .map(amenity => amenity.amenity.id)
    }
  }
}


