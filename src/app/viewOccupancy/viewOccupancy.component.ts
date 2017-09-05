import {AfterViewInit, Component, ContentChildren, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import * as interact from 'interactjs';
import {ParkingSpace} from '../parking-space/parking-space';
import {ParkingSpaceComponent} from '../parking-space/parking-space.component';
import {ParkingSpaceService} from '../parking-space/parking-space.service';

@Component({
  selector: 'viewOccupancy',
  templateUrl: './viewOccupancy.component.html',
  styleUrls: ['./viewOccupancy.component.css'],
  providers: [ParkingSpaceService]
})

export class ViewOccupancyComponent {
  private parkingSpaces;

  @ViewChildren(ParkingSpaceComponent) viewChildren;
  @ContentChildren(ParkingSpaceComponent) contentChildren;

  constructor(private parkingSpaceService: ParkingSpaceService) {
    parkingSpaceService
      .getParkingSpacesForGarage(666)
      .then((storedParkingSpaces) => this.parkingSpaces = storedParkingSpaces);
  }

  toggleOccupancy(parkingSpaceIndex: number) {
    this.parkingSpaces[parkingSpaceIndex].toggleOccupancy();
    // Update on DB
  }
}
