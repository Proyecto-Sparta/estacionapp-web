import {AfterViewInit, Component, ContentChildren, ElementRef, ViewChild, ViewChildren} from '@angular/core';
import * as interact from 'interactjs';
import {ParkingSpace} from '../parking-space/parking-space';
import {ParkingSpaceComponent} from '../parking-space/parking-space.component';
import {Floor} from '../floors/floor';
import {GarageLayoutService} from '../garage/garageLayout.service';
import {Point} from './point';
import {GarageLayout} from '../garage/garageLayout';

declare var jsGraphics, jsColor, jsPen, jsPoint: any;

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [GarageLayoutService]
})
export class LayoutComponent implements AfterViewInit {
  private floors;
  private layoutScale;
  private currentFloor = 0;
  private modeLayout = true;
  private jsGraphics;
  private points: Array<Point>;

  @ViewChild('garage') garage: ElementRef;
  @ViewChildren(ParkingSpaceComponent) viewChildren;
  @ContentChildren(ParkingSpaceComponent) contentChildren;

  constructor(private garageLayoutService: GarageLayoutService) {
    this.garageLayoutService = garageLayoutService;
    this.floors = [];
    this.points = [];
  }

  ngAfterViewInit(): void {
    this.layoutScale = this.garage.nativeElement.offsetWidth / 1080;
    this.garageLayoutService
        .getGarageLayout()
        .then((garageLayout: GarageLayout) => garageLayout.applyScale(this.layoutScale))
        .then((garageLayout: GarageLayout) => {
          this.floors = garageLayout.floors.length > 0? garageLayout.floors : [new Floor(1)];
          this.points = garageLayout.shape;

          if (this.points.length > 2) {
            this.drawLayout();
            this.setModeLayout(false);
          }
        });
    this.setupDropzone();
    this.setupDraggables();

    this.jsGraphics = new jsGraphics(document.getElementById('canvas'));
    this.jsGraphics.setOrigin(new jsPoint(15, 41));
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
      onmove: function (event) {
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
    console.log(this.floors[this.currentFloor]);
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
    if(modeLayout) {
      this.jsGraphics.showGrid(20);
    }else {
      if(this.points.length == 0) {
        console.log("Draw a layout first");
        return;
      }
      this.jsGraphics.clear();
      this.drawLayout();
    }

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
      this.floors.push(new Floor(this.currentFloor + 1, 0, []))
    }

    console.log(this.viewChildren);
    this.viewChildren.forEach(child => child.updatePosition(child));
    this.currentFloor += 1;
  }

  saveLayout() {
    this.viewChildren.map(child => child.updatePosition());
    console.log(this.floors);
    this.garageLayoutService.storeGarageLayout(
      new GarageLayout(this.points, this.floors).applyScale(1 / this.layoutScale)
    );
  }

  private setPoint(x, y) {
    if (!this.modeLayout) {
      return;
    }

    const pen = new jsPen(new jsColor('red'), 1);
    const center = new jsPoint(x, y);
    this.jsGraphics.drawCircle(pen, center, 5);

    this.points.push(new Point(x, y));
  }

  private drawLayout() {
    const jsPoints = this.points.map((point) => new jsPoint(point.x, point.y));
    const pen = new jsPen(new jsColor('black'), 3);
    this.jsGraphics.drawPolygon(pen, jsPoints);
  }

  private clearLayout() {
    this.points = new Array();
    this.jsGraphics.clear();
  }
}
