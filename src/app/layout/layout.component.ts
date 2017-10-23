import {AfterViewInit, Component, ContentChildren, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import * as interact from 'interactjs';
import {ParkingSpace} from '../parking-space/parking-space';
import {ParkingSpaceComponent} from '../parking-space/parking-space.component';
import {Floor} from '../floors/floor';
import {FloorService} from '../floors/floor.service';
import {Point} from './point';

declare var jsGraphics, jsColor, jsPen, jsPoint: any;

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [FloorService]
})
export class LayoutComponent implements AfterViewInit {
  private floors;
  private layoutScale;
  private currentFloor = 0;
  private modeLayout = true;
  private jsGraphics;
  private points: Array<Point> = new Array();

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

    this.setupDropzone();
    this.setupDraggables();

    const layoutPosition = this.garage.nativeElement.getBoundingClientRect();
    this.jsGraphics = new jsGraphics(document.getElementById("canvas"));
    this.jsGraphics.setOrigin(new jsPoint(layoutPosition.left + window.pageXOffset, layoutPosition.top + window.pageYOffset));
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

  private applyScale(floors, scale) {
    return floors.map(floor => floor.applyScaleToParkingSpaces(scale));
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
    this.floors[this.currentFloor].parkingSpaces.push(smallParkingSpace);
  }

  private renderMediumParkingSpace() {
    const mediumParkingSpace = new ParkingSpace('square', 10, 10, 60, 60, 0);
    this.floors[this.currentFloor].parkingSpaces.push(mediumParkingSpace);
  }

  private renderLargeParkingSpace() {
    const largeParkingSpace = new ParkingSpace('square', 10, 10, 100, 100, 0);
    this.floors[this.currentFloor].parkingSpaces.push(largeParkingSpace);
  }

  private setModeLayout(modeLayout) {
    this.modeLayout = modeLayout;
  }

  private lowerFloor() {
    if (this.floors[this.currentFloor - 1]) {
      this.viewChildren.forEach(child => child.updatePosition(child));
      this.currentFloor -= 1;
      console.log(this.floors);
    }
  }

  private upperFloor() {
    if (!this.floors[this.currentFloor + 1]) {
      this.floors.push(new Floor(this.currentFloor + 1, []))
    }

    console.log(this.viewChildren);
    this.viewChildren.forEach(child => child.updatePosition(child));
    this.currentFloor += 1;
  }

  saveLayout() {
    this.viewChildren.forEach(child => child.updatePosition(child));
    this.floorService.storeFloorPlansForGarage(
      666,
      this.floors.map((floor) => floor.applyScale(1 / this.layoutScale))
    );
  }

  private setPoint(event) {
    if (!this.modeLayout) {
      return;
    }
    
    const pen = new jsPen(new jsColor('red'), 1);
    const center = new jsPoint(event.offsetX, event.offsetY);
    this.jsGraphics.drawCircle(pen, center, 5);

    this.points.push(new Point(event.offsetX, event.offsetY));
  }

  private drawLayout() {
    const jsPoints = this.points.map((point) => new jsPoint(point.x, point.y));
    const pen = new jsPen(new jsColor('black'), 1);
    this.jsGraphics.drawPolygon(pen, jsPoints);
  }
}
