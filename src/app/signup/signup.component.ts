import {Component} from '@angular/core';
import {mapListener} from '../interfaces/mapListener';
import {GarageService} from '../garage/garage.service';
import {Marker} from '../map/map.component';
import {SignUpModelValidator} from './signupModelValidator';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [GarageService]
})
export class SignUpComponent implements mapListener {
  submitted = false;
  errors = [];

  model = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
    location: null
  };

  validator = new SignUpModelValidator();

  onMarkerLocationChanged(marker: Marker) {
    this.model.location = marker;
  }

  onSubmit() {
    const validation = this.validator.validate(this.model);
    this.errors = validation.errors;
    return !validation.result;
  }

}
