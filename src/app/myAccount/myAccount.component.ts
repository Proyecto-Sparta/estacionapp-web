import {Component} from '@angular/core';
import {NotificationStream} from "../notification-stream/notification-stream";

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
    console.log(driver);
    if(driver.name) {
      this.drivers.push(driver);
    }
  }

  public acceptDriver(driver){
    this.notificationStream.accept(driver);
    this.drivers = this.drivers.filter(aDriver => driver === aDriver);
  }

  public denyDriver(driver){
    this.notificationStream.deny(driver);
    this.drivers = this.drivers.filter(aDriver => driver === aDriver);

  }


}
