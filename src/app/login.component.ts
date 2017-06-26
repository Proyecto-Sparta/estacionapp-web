import {Component} from "@angular/core";
import {Garage} from "./garage";
import {NgForm} from "@angular/forms";
import {GarageService} from "./garage.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [GarageService]
})
export class LoginComponent {
  title = 'Login';

  submitted = false;
  model = new Garage('Garage', 'password');

  constructor(private garageService: GarageService) {
  }

  onSubmit(loginForm: NgForm) {
    this.garageService.login(new Garage(
      loginForm.value.username,
      loginForm.value.password));
  }

}
