import {Component, OnInit} from '@angular/core';
import {GarageService} from "../garage/garage.service";
import {DashboardService} from "./dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private garageService : GarageService, private dashboardService : DashboardService) {
  }

  private model;

  ngOnInit() {
    this.model =  {
      name : this.garageService.getGarage()['name'],
      occupancies : this.dashboardService.getPercentage(),
      cars: this.dashboardService.getVehicle("car"),
      pickups: this.dashboardService.getVehicle("pickup"),
      bikes: this.dashboardService.getVehicle("bike")
    }
  }

}
