import {AfterViewInit, Component, ContentChildren, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import * as interact from 'interactjs';
import {ParkingSpace} from '../parking-space/parking-space';
import {ParkingSpaceComponent} from '../parking-space/parking-space.component';
import {Floor} from '../floors/floor';
import {FloorService} from '../floors/floor.service';

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

  @ViewChild('garage') garage: ElementRef;
  @ViewChildren(ParkingSpaceComponent) viewChildren;
  @ContentChildren(ParkingSpaceComponent) contentChildren;

  constructor(private floorService: FloorService) {
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

  toggleOccupancy(parkingSpaceIndex: number) {
    this.floors[this.currentFloor].parkingSpaces[parkingSpaceIndex].toggleOccupancy();
    // Update on DB
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
}
