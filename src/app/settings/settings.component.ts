import {Component, OnInit} from '@angular/core';
import {SettingsValidator} from "./settings-validator";
import {SettingsModel} from "./settings";
import {GarageService} from "../garage/garage.service";
import {SettingsService} from "./settings.service";

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private settingsService : SettingsService, private garageService : GarageService){}

  private model : SettingsModel;

  ngOnInit() {
    const garage = JSON.parse(localStorage.getItem('garage'));
    this.model = this.settingsService.mapToSettingsModel(garage);

  }

  submitted = false;
  errors = [];

  validator = new SettingsValidator();

  onSubmit() {
    const validation = this.validator.validate(this.model);
    this.errors = validation.errors;
    return !validation.result;
  }

}
