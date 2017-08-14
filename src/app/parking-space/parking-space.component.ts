import {AfterViewInit, Component, HostListener} from '@angular/core';
import * as interact from 'interactjs';

@Component({
  selector: 'parking-space',
  templateUrl: './parking-space.component.html',
  styleUrls: ['./parking-space.component.css']
})
export class ParkingSpaceComponent implements AfterViewInit {

  constructor() {
  }

  ngAfterViewInit(): void {
    this.setupDraggable();
  }

  private setupDraggable() {
    interact('.parking-space').draggable({
      inertia: true,
      restrict: {
        restriction: ".dropzone",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },

      autoScroll: true,

      onmove: function (event) {
        let target = event.target,
          // keep the dragged position in the data-x/data-y attributes
          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
          target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      }
    });
  }

}
