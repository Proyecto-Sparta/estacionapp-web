import {Component} from '@angular/core';
import {mapListener} from '../interfaces/mapListener';
import {GarageService} from '../garage/garage.service';
import {Marker} from '../map/map.component';
import {SignUpModelValidator} from './signupModelValidator';
import {Pricing} from "../garage/pricing";
import {SignupModel} from "./signup";
import {Amenity} from "../garage/amenity";

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [GarageService]
})
export class SignUpComponent implements mapListener {

  constructor(private garageService : GarageService){}

  submitted = false;
  errors = [];

  model = new SignupModel();

  validator = new SignUpModelValidator();

  onMarkerLocationChanged(marker: Marker) {
    this.model.location = marker;
  }

  onSubmit() {
    const validation = this.validator.validate(this.model);
    this.errors = validation.errors;
    return !validation.result;
  }

  availableAmenities(){
    return this.garageService.getAmenities();
  }

  chooseAmenity(amenity: Amenity, event) {
    amenity = this.availableAmenities()[event.target.value];
    if (event.target.checked) {
      console.log(`amenity added: ${amenity.id}`);
      this.model.amenities.push(amenity);
    }else {
      console.log(`quit: ${amenity.id}`);
      this.model.amenities = this.model.amenities.filter(am => am.id !== amenity.id);
    }

    console.log(this.model.amenities);
    return;
  }

  isAmenitySelected(amenityId: String) {
    return this.model.amenities.find(am => am.id === amenityId);
  }

}
