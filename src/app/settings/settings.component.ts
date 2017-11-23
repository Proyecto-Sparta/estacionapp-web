import {Component, OnInit, ViewChild} from '@angular/core';
import {SettingsValidator} from "./settings-validator";
import {SettingsModel} from "./settings";
import {GarageService} from "../garage/garage.service";
import {SettingsService} from "./settings.service";
import {AlertComponent} from "../alert/alert.component";

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @ViewChild(AlertComponent) alertComponent;

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
    if(validation.result){
      this.settingsService.save(this.model)
        .then((response) => this.garageService.setGarage(response))
        .then(() => this.alertComponent.newAlert("Settings changed"))
        .catch(() => this.alertComponent.newError("Couldn't sign up"));
    }
  }

}
