import {Component, OnInit, ViewChild} from '@angular/core';
import {mapListener} from '../interfaces/mapListener';
import {GarageService} from '../garage/garage.service';
import {Marker} from '../map/map.component';
import {SignUpModelValidator} from './signupModelValidator';
import {AmenityCheckbox, SignupModel} from "./signup";
import {SignupService} from "./signup.service";
import {Router} from "@angular/router";
import {AlertComponent} from "app/alert/alert.component";

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [GarageService]
})
export class SignUpComponent implements mapListener, OnInit {

  @ViewChild(AlertComponent) alertComponent;

  ngOnInit(): void {
    this.model.amenities = this.garageService.getAmenities()
      .map(amenity => new AmenityCheckbox(amenity, false));
  }

  constructor(private garageService: GarageService,
              private  signupService : SignupService,
              private router : Router) {
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
      this.signupService.signup(this.model)
        .then(() => this.router.navigate(['/myAccount/dashboard']))
        .catch(this.alertComponent.newError("Couldn't sign up"));
    }
  }

}
