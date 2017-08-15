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
        restriction: '.dropzone',
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },

      autoScroll: true,
      onmove: function (event) {
        let target = event.target,

          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        target.style.webkitTransform =
          target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      }
    })
      .resizable({
        preserveAspectRatio: true,
        edges: { left: false, right: true, bottom: true, top: false },
      })
      .on('resizemove', function (event) {
        let target = event.target,
          x = (parseFloat(target.getAttribute('data-x')) || 0),
          y = (parseFloat(target.getAttribute('data-y')) || 0);


        target.style.width  = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
          'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      });

  }

}
