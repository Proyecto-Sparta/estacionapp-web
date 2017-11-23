import {AfterViewInit, Component, ContentChildren, ElementRef, OnInit, ViewChild, ViewChildren} from '@angular/core';
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
import {GarageService} from "../garage/garage.service";
import {AssignedDriversService} from "../driver/assigned-drivers.service";
import {AlertComponent} from "../alert/alert.component";

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
  @ViewChild(AlertComponent) alertComponent;

  constructor(db: AngularFireDatabase, private garageService : GarageService, private garageLayoutService: GarageLayoutService,
              private pendingDriversService: PendingDriversService, private assignedDriversService : AssignedDriversService) {

    this.pendingDriversService = pendingDriversService;
    this.garageLayoutService = garageLayoutService;
    this.floors = [{parkingSpaces: []}];
    this.points = [];
  }


  ngAfterViewInit(): void {
    this.garageLayoutService
      .getGarageLayout()
      .then((garageLayout: GarageLayout) => {
        this.floors = garageLayout.floors;
        this.points = garageLayout.shape;

        if (this.points.length > 2) {
          this.drawLayout();
        }
    })
      .then(() => this.floors.forEach(floor =>
        floor.parkingSpaces.forEach( parkingSpace =>
          parkingSpace.reservation = this.garageService.findReservationFor(parkingSpace, floor.floorLevel - 1  ))))
      .then(() => console.log(this.floors));

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

  private denyDriver(driver : PendingDriver) {
    this.selectedDriver = null;
    this.pendingDriversService.deny(driver);
  }

  private drawLayout() {
    const jsPoints = this.points.map((point) => new jsPoint(point.x.toFixed(0), point.y.toFixed(0)));
    console.log(jsPoints);
    const pen = new jsPen(new jsColor('black'), 3);
    this.jsGraphics.drawPolygon(pen, jsPoints);
  }

  private toggleOccupancy(parkingSpaceIndex: number) {
    const parkingSpace: ParkingSpace = this.floors[this.currentFloor].parkingSpaces[parkingSpaceIndex],
      isOccupied = parkingSpace.occupied,
      isDriverSelected = !isNull(this.selectedDriver);

    parkingSpace.toggleOccupancy();


    if (parkingSpace.occupied && !isDriverSelected) {
      this.garageLayoutService.updateFloor(this.floors[this.currentFloor]);
      this.alertComponent.newAlert("Lugar asignado correctamente");
      return;
    }

    if (parkingSpace.occupied && isDriverSelected) {
      return this.pendingDriversService.assign(parkingSpace, this.selectedDriver, this.floors[this.currentFloor])
        .then(() => this.selectedDriver = null)
        .then(() => this.alertComponent
          .newAlert(`Lugar asignado a ${parkingSpace.reservation.driver.fullName}`));

    }
    if(!parkingSpace.occupied){
      if(parkingSpace.reservation) {
        this.deoccupy(parkingSpace, this.floors[this.currentFloor]);
      }
      else {
        this.garageLayoutService.updateFloor(this.floors[this.currentFloor]);
      }

      this.alertComponent.newAlert("Reserva cerrada");

    }
  }

  private deoccupy(parkingSpace : ParkingSpace, floor : Floor){
    this.assignedDriversService
      .deleteReservation(parkingSpace.reservation, floor);
    parkingSpace.reservation = null;
    this.alertComponent.newAlert("Deoccupied parking space");
  }
}
