import {AfterViewInit, Component, ContentChildren, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ParkingSpaceComponent} from '../parking-space/parking-space.component';
import {Floor} from '../floors/floor';
import {FloorService} from '../floors/floor.service';
import {Observable} from "rxjs/Observable";
import {PendingDriversService} from "../pendingDrivers/pendingDrivers.service";
import {AngularFireDatabase} from "angularfire2/database";
import {isNull} from "util";
import {PendingDriver} from "../pendingDrivers/pending-driver";
import {ParkingSpace} from "../parking-space/parking-space";

@Component({
  selector: 'viewOccupancy',
  templateUrl: './viewOccupancy.component.html',
  styleUrls: ['./viewOccupancy.component.css'],
  providers: [FloorService]
})

export class ViewOccupancyComponent implements AfterViewInit {
  private floors : Array<any>;
  private layoutScale;
  private currentFloor = 0;
  private selectedDriver : PendingDriver = null;

  @ViewChild('garage') garage: ElementRef;
  @ViewChildren(ParkingSpaceComponent) viewChildren;
  @ContentChildren(ParkingSpaceComponent) contentChildren;

  constructor(db: AngularFireDatabase, private floorService: FloorService,
              private pendingDriversService : PendingDriversService) {
    this.floorService = floorService;
    this.floors = [{parkingSpaces: []}];
  }


  ngAfterViewInit(): void {
    this.layoutScale = this.garage.nativeElement.offsetWidth / 1080;
    console.log(this.layoutScale);
    this.floorService
      .getFloorPlans(666)
      .then((floors) => this.applyScale(floors, this.layoutScale))
      .then((storedFloors) => this.floors = storedFloors);
  }

  private getAllDrivers() {
    return this.pendingDriversService.getDrivers();
  }

  private getDrivers() {
    return this.pendingDriversService.getDrivers()
      .switchMap((drivers: PendingDriver[]) => drivers.filter(driver => driver.waiting));
  }

  private applyScale(floors, scale) {
    return floors.map(floor => floor.applyScaleToParkingSpaces(scale));
  }


  private lowerFloor() {
    if (this.floors[this.currentFloor - 1]) {
      this.viewChildren.forEach(child => child.updatePosition(child));
      this.currentFloor -= 1;
    }
  }

  private upperFloor() {
    if (!this.floors[this.currentFloor + 1]) {
      this.floors.push(new Floor(this.currentFloor + 1, []))
    }

    this.viewChildren.forEach(child => child.updatePosition(child));
    this.currentFloor += 1;
  }

  private selectDriver(driver : PendingDriver) {
    this.selectedDriver = driver;
    console.log(`Selected ${driver}`);
  }

  private denyDriver(driver : PendingDriver){
    this.pendingDriversService.deny(driver);
  }


  private toggleOccupancy(parkingSpaceIndex: number) {
    const parkingSpace : ParkingSpace = this.floors[this.currentFloor].parkingSpaces[parkingSpaceIndex],
      isOccupied = parkingSpace.occupied,
      isDriverSelected = !isNull(this.selectedDriver);

    if (!isOccupied && !isDriverSelected) {
      alert("Select a driver first!");
      return;
    }

    if (!isOccupied && isDriverSelected) {
      // TODO: Assign space to driver
      this.pendingDriversService.assign(parkingSpaceIndex, this.selectedDriver);
      parkingSpace.assign(this.selectedDriver);
      this.selectedDriver = null;
    }

    parkingSpace.toggleOccupancy();
  }
}
