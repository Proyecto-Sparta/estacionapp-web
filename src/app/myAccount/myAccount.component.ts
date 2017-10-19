import {Component} from '@angular/core';
import {NotificationStream} from "../notification-stream/notification-stream";
import {PendingDriversService} from '../pendingDrivers/pendingDrivers.service';

@Component({
  selector: 'myAccount',
  templateUrl: './myAccount.component.html',
  styleUrls: ['./myAccount.component.css'],
  providers: [PendingDriversService]
})

export class MyAccountComponent {

  private drivers: Array<String> = [];
  private notificationStream: NotificationStream;
  private pendingDriversService: PendingDriversService;

  constructor(pendingDriversService: PendingDriversService) {
    this.pendingDriversService = pendingDriversService;
    this.notificationStream = new NotificationStream(localStorage.getItem("currentUser"),
      (driver) => this.addNewDriver(driver));
  }

  public addNewDriver(driver) {
    if (driver.name) {
      this.drivers.push(driver.name);
    }
  }

  public acceptDriver(driver) {
    this.notificationStream.accept(driver);
    this.pendingDriversService.addPendingDriver(driver);
    this.drivers = this.removeDriver(driver);
  }

  public denyDriver(driver) {
    this.notificationStream.deny(driver);
    this.drivers = this.removeDriver(driver);
  }

  private removeDriver(driver) {
    return this.drivers.filter(aDriver => driver !== aDriver);
  }


}
