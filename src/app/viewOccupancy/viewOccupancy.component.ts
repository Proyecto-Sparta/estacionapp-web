import {AfterViewInit, Component, ContentChildren, ElementRef, ViewChild, ViewChildren} from '@angular/core';
import {ParkingSpaceComponent} from '../parking-space/parking-space.component';
import {Floor} from '../floors/floor';
import {PendingDriversService} from "../pending-drivers/pending-drivers.service";
import {GarageLayoutService} from '../garage/garageLayout.service';
import {Point} from '../layout/point';
import {GarageLayout} from '../garage/garageLayout';
import {Observable} from "rxjs/Observable";
import {AngularFireDatabase} from "angularfire2/database";
import {isNull} from "util";
import {PendingDriver} from "../pending-drivers/pending-driver";
import {ParkingSpace} from "../parking-space/parking-space";

declare var jsGraphics, jsPoint, jsPen, jsColor;

@Component({
  selector: 'viewOccupancy',
  templateUrl: './viewOccupancy.component.html',
  styleUrls: ['./viewOccupancy.component.css'],
  providers: [GarageLayoutService]
})

export class ViewOccupancyComponent implements AfterViewInit {
  private floors: Array<any>;
  private layoutScale;
  private currentFloor = 0;
  private selectedDriverIndex = -1;
  private jsGraphics;
  private points: Array<Point>;
  private pendingDrivers;
  private selectedDriver : PendingDriver = null;
  private showAlert = false;

  @ViewChild('garage') garage: ElementRef;
  @ViewChildren(ParkingSpaceComponent) viewChildren;
  @ContentChildren(ParkingSpaceComponent) contentChildren;

  constructor(db: AngularFireDatabase, private garageLayoutService: GarageLayoutService,
              private pendingDriversService: PendingDriversService) {

    this.pendingDriversService = pendingDriversService;
    this.garageLayoutService = garageLayoutService;
    this.floors = [{parkingSpaces: []}];
    this.points = [];
  }


  ngAfterViewInit(): void {
    this.layoutScale = this.garage.nativeElement.offsetWidth / 1080;
    console.log(this.layoutScale);
    this.garageLayoutService
      .getGarageLayout()
      .then((garageLayout: GarageLayout) => garageLayout.applyScale(this.layoutScale))
      .then((garageLayout: GarageLayout) => {
        this.floors = garageLayout.floors;
        this.points = garageLayout.shape;

        if (this.points.length > 2) {
          this.drawLayout();
        }
    });

    this.jsGraphics = new jsGraphics(document.getElementById("canvas"));
    this.jsGraphics.setOrigin(new jsPoint(15, 41));
  }

  private getDrivers() {
    return this.pendingDriversService.getDrivers();
  }

  private applyScale(floors, scale) {
    return floors.map(floor => floor.applyScaleToParkingSpaces(scale));
  }


  private lowerFloor() {
    if (this.floors[this.currentFloor - 1]) {
      this.viewChildren.forEach(child => child.updatePosition());
      this.currentFloor -= 1;
    }
  }

  private upperFloor() {
    if (!this.floors[this.currentFloor + 1]) {
      this.floors.push(new Floor(this.currentFloor + 1, 0, []))
    }

    this.viewChildren.forEach(child => child.updatePosition());
    this.currentFloor += 1;
  }

  private selectDriver(driver: PendingDriver) {
    this.selectedDriver = driver;
    console.log(`Selected ${driver}`);
  }

  private denyDriver(id: string) {
    this.pendingDriversService.deny(id);
  }

  private drawLayout() {
    const jsPoints = this.points.map((point) => new jsPoint(point.x, point.y));
    const pen = new jsPen(new jsColor('black'), 3);
    this.jsGraphics.drawPolygon(pen, jsPoints);
  }

  private toggleOccupancy(parkingSpaceIndex: number) {
    const parkingSpace: ParkingSpace = this.floors[this.currentFloor].parkingSpaces[parkingSpaceIndex],
      isOccupied = parkingSpace.occupied,
      isDriverSelected = !isNull(this.selectedDriver);

    if (!isOccupied && !isDriverSelected) {
      this.showAlert = true;
      return;
    }

    if (!isOccupied && isDriverSelected) {
      // TODO: Assign space to driver
      this.pendingDriversService.assign(parkingSpaceIndex, this.selectedDriver, this.currentFloor);
      parkingSpace.assign(this.selectedDriver);
      this.selectedDriver = null;
    }

    parkingSpace.toggleOccupancy();
  }
}
