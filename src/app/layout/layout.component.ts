import {AfterViewInit, Component, ContentChildren, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import * as interact from 'interactjs';
import {ParkingSpace} from '../parking-space/parking-space';
import {ParkingSpaceComponent} from '../parking-space/parking-space.component';
import {ParkingSpaceService} from '../parking-space/parking-space.service';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [ParkingSpaceService]
})


export class LayoutComponent implements AfterViewInit {
  private parkingSpaces;

  @ViewChildren(ParkingSpaceComponent) viewChildren;
  @ContentChildren(ParkingSpaceComponent) contentChildren;

  constructor(private parkingSpaceService: ParkingSpaceService) {
    parkingSpaceService
      .getParkingSpacesForGarage(666)
      .then((storedParkingSpaces) => this.parkingSpaces = storedParkingSpaces);
  }

  ngAfterViewInit(): void {
    this.setupDropzone();
    this.viewChildren.changes.subscribe(changes => console.log(changes));
    this.contentChildren.changes.subscribe(changes => console.log(changes));
    }

  private setupDropzone() {
    interact('.dropzone').dropzone({
      overlap: 'pointer',

      ondropactivate: function (event) {
        event.target.classList.add('drop-active');
      },
      ondragenter: function (event) {
        const draggableElement = event.relatedTarget,
          dropzoneElement = event.target;

        dropzoneElement.classList.add('drop-target');
        draggableElement.classList.add('can-drop');
      },
      ondragleave: function (event) {
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
      },
      ondropdeactivate: function (event) {
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
      }
    });

  }

  saveLayout() {
    this.viewChildren.forEach(child => child.updatePosition(child));
  }
}
