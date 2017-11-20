import {Component, OnInit} from '@angular/core';
import {SettingsValidator} from "./settings-validator";

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  ngOnInit() {
    const garage = JSON.parse(localStorage.getItem('garage'));
    this.model.username = garage['name'];
    this.model.email = garage['email'];

  }

  submitted = false;
  errors = [];

  model = {
    username: null,
    email: null,
    actualPassword: null,
    newPassword: null,
    confirmPassword: null
  };

  validator = new SettingsValidator();

  onSubmit() {
    const validation = this.validator.validate(this.model);
    this.errors = validation.errors;
    return !validation.result;
  }

}
