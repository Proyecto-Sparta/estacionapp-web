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
    this.viewChildren.changes.subscribe(changes => console.log(changes));
    this.contentChildren.changes.subscribe(changes => console.log(changes));
    this.setupDropzone();
    this.setupDraggables();
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

  private setupDraggables() {
    interact('.parking-space').draggable({
      inertia: true,
      endOnly: false,
      restrict: {
        restriction: '.dropzone',
        elementRect: {top: 0, left: 0, bottom: 1, right: 1}
      },

      autoScroll: true,
      onmove: function(event){
        const target = event.target,
          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        target.style.webkitTransform =
          target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      }
    });
  }

  private renderSmallParkingSpace() {
    const smallParkingSpace = new ParkingSpace('square', 10, 10, 40, 40, 0);
    this.parkingSpaces.push(smallParkingSpace);
  }
  private renderMediumParkingSpace() {
    const mediumParkingSpace = new ParkingSpace('square', 10, 10, 60, 60, 0);
    this.parkingSpaces.push(mediumParkingSpace);
  }
  private renderLargeParkingSpace() {
    const largeParkingSpace = new ParkingSpace('square', 10, 10, 100, 100, 0);
    this.parkingSpaces.push(largeParkingSpace);
  }

  saveLayout() {
    this.viewChildren.forEach(child => child.updatePosition(child));
    this.parkingSpaceService.storeParkingSpacesForGarage(666, this.parkingSpaces);
  }
}
