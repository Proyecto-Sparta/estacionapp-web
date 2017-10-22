import {AfterViewInit, Component, ContentChildren, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ParkingSpaceComponent} from '../parking-space/parking-space.component';
import {Floor} from '../floors/floor';
import {FloorService} from '../floors/floor.service';
import {AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {PendingDriversService} from "../pendingDrivers/pendingDrivers.service";

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
  private selectedDriver;
  private pendingDrivers : Observable<any[]>;

  @ViewChild('garage') garage: ElementRef;
  @ViewChildren(ParkingSpaceComponent) viewChildren;
  @ContentChildren(ParkingSpaceComponent) contentChildren;

  constructor(db: AngularFirestore, private floorService: FloorService,
              private pendingDriversService : PendingDriversService) {
    this.pendingDrivers = db.collection('drivers').valueChanges();
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

  private selectDriver(driver) {
    this.selectedDriver = driver;
  }


  private toggleOccupancy(parkingSpaceIndex: number) {
    const parkingSpace = this.floors[this.currentFloor].parkingSpaces[parkingSpaceIndex],
      isOccupied = !parkingSpace.occupied,
      isDriverSelected = !this.selectedDriver;

    if (!isOccupied && !isDriverSelected) {
      console.log("Select a driver first!");
      return;
    }

    if (!isOccupied && isDriverSelected) {
      // TODO: Assign space to driver
      this.pendingDriversService.assign(parkingSpaceIndex, this.selectedDriver);
      this.selectedDriver = null;
    }

    parkingSpace.toggleOccupancy();
  }
}
