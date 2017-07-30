import {Component} from "@angular/core";
import {Garage} from "../garage";
import {NgForm} from "@angular/forms";
import {GarageService} from "../garage.service";
import {SignUpModelValidator} from "./signupModelValidator";

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [GarageService]
})
export class SignUpComponent {
  title = 'Signup';

  submitted = false;
  errors = [];

  model = {
    'username': '',
    'email': '',
    'password': '',
    'confirmPassword': '',
    'location': ''
  }

  validator = new SignUpModelValidator();

  constructor(private garageService: GarageService) {
  }

  onSubmit() {
    let validation = this.validator.validate(this.model);
    if(!validation.result){
      this.errors = validation.errors;
      return false;
    }

/*
    this.garageService.login(new Garage(
      loginForm.value.username,
      loginForm.value.password));
      */
  }

}
