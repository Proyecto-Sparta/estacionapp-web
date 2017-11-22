import {Component, OnInit} from '@angular/core';
import {mapListener} from '../interfaces/mapListener';
import {GarageService} from '../garage/garage.service';
import {Marker} from '../map/map.component';
import {SignUpModelValidator} from './signupModelValidator';
import {AmenityCheckbox, SignupModel} from "./signup";
import {SignupService} from "./signup.service";

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [GarageService]
})
export class SignUpComponent implements mapListener, OnInit {

  ngOnInit(): void {
    this.model.amenities = this.garageService.getAmenities()
      .map(amenity => new AmenityCheckbox(amenity, false));
  }

  constructor(private garageService: GarageService, private  signupService : SignupService) {
  }

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
    if(!validation.result){
      this.signupService.signup(this.model);
    }
  }

  getChecked() {
    return this.model.amenities.filter(amenity => amenity.checked);
  }

}
