import {Component} from "@angular/core";
import {Garage} from "../garage/garage";
import {NgForm} from "@angular/forms";
import {GarageService} from "../garage/garage.service";
import {LoginService} from "./login.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [GarageService]
})
export class LoginComponent {

  model = new Garage('Garage', 'password');

  constructor(private loginService: LoginService) {
  }

  onSubmit(loginForm: NgForm) {
    this.loginService.login(new Garage(
      loginForm.value.username,
      loginForm.value.password));
  }

}
