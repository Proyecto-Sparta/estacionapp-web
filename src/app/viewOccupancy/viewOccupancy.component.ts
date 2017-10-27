import {AfterViewInit, Component, ContentChildren, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import * as interact from 'interactjs';
import {ParkingSpace} from '../parking-space/parking-space';
import {ParkingSpaceComponent} from '../parking-space/parking-space.component';
import {Floor} from '../floors/floor';
import {FloorService} from '../floors/floor.service';
import {PendingDriversService} from '../pendingDrivers/pendingDrivers.service';
import {Point} from '../layout/point';

declare var jsGraphics, jsPoint, jsPen, jsColor;

@Component({
  selector: 'viewOccupancy',
  templateUrl: './viewOccupancy.component.html',
  styleUrls: ['./viewOccupancy.component.css'],
  providers: [FloorService]
})

export class ViewOccupancyComponent implements AfterViewInit {
  private floors;
  private layoutScale;
  private currentFloor = 0;
  private selectedDriverIndex = -1;
  private jsGraphics;
  private points: Array<Point> = new Array(new Point(10,10),new Point(550,410), new Point(550,10));

  private pendingDriversService: PendingDriversService;
  private pendingDrivers;

  @ViewChild('garage') garage: ElementRef;
  @ViewChildren(ParkingSpaceComponent) viewChildren;
  @ContentChildren(ParkingSpaceComponent) contentChildren;

  constructor(private floorService: FloorService, pendingDriversService: PendingDriversService) {
    this.pendingDriversService = pendingDriversService;
    this.pendingDrivers = this.pendingDriversService.getPendingDrivers();

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

    this.jsGraphics = new jsGraphics(document.getElementById("canvas"));
    this.jsGraphics.setOrigin(new jsPoint(15, 41));
    if(this.points.length > 2) {
      this.points = this.points.map(point => point.applyScale(this.layoutScale));
      this.drawLayout();
    }
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

  private selectDriver(driverIndex) {
    this.selectedDriverIndex = driverIndex;
  }

  private drawLayout() {
    const jsPoints = this.points.map((point) => new jsPoint(point.x, point.y));
    const pen = new jsPen(new jsColor('black'), 3);
    this.jsGraphics.drawPolygon(pen, jsPoints);
  }

  private toggleOccupancy(parkingSpaceIndex: number) {
    const parkingSpace = this.floors[this.currentFloor].parkingSpaces[parkingSpaceIndex],
      isOccupied = parkingSpace.occupied,
      driverSelected = this.selectedDriverIndex !== -1;

    if (!isOccupied && !driverSelected) {
      console.log("Select a driver first!");
      return;
    }

    if (!isOccupied && driverSelected) {
      // TODO: Assign space to driver
      this.pendingDriversService.removePendingDriver(this.pendingDrivers[this.selectedDriverIndex]);
      this.pendingDrivers = this.pendingDrivers.filter((_, i) => i !== this.selectedDriverIndex);
      this.selectedDriverIndex = -1;
    }

    parkingSpace.toggleOccupancy();
  }
}
