import {Component} from '@angular/core';
import {NotificationStream} from "../notification-stream/notification-stream";
import {isNull} from "util";

@Component({
  selector: 'myAccount',
  templateUrl: './myAccount.component.html',
  styleUrls: ['./myAccount.component.css']
})

export class MyAccountComponent {

  private drivers: Array<String> = [];
  private notificationStream : NotificationStream;

  constructor() {

    this.notificationStream = new NotificationStream(localStorage.getItem("currentUser"),
      (driver) => this.addNewDriver(driver));
  }


  public addNewDriver(driver){
    if(driver.name) {
      this.drivers.push(driver);
    }
  }


}
