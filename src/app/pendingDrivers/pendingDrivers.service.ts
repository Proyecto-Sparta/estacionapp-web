import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';

@Injectable()
export class PendingDriversService {
  private pendingDrivers: Array<String> = [];

  constructor() {
  }

  public addPendingDriver(driver: String) {
    this.pendingDrivers.push(driver);
  }

  public getPendingDrivers() {
    return this.pendingDrivers;
  }
}
