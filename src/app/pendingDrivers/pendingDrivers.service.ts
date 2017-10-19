import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';

@Injectable()
export class PendingDriversService {
  private LOCAL_STORAGE_KEY = 'pendingDrivers';
  private pendingDrivers: Array<String> = [];

  constructor() {
    this.pendingDrivers = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY)) || [];
    console.log("[pendingDrivers] Stored: "+this.pendingDrivers);
  }

  public addPendingDriver(driver: String) {
    this.pendingDrivers.push(driver);
    this.storePendingDrivers();
  }

  public removePendingDriver(pendingDriver: String) {
    console.log("[pendingDrivers] Removing: "+pendingDriver);
    this.pendingDrivers = this.pendingDrivers.filter(driver => driver !== pendingDriver);
    this.storePendingDrivers();
  }

  public getPendingDrivers() {
    return this.pendingDrivers;
  }

  private storePendingDrivers() {
    console.log("[pendingDrivers] Storing: "+JSON.stringify(this.pendingDrivers));
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.pendingDrivers));
  }
}
