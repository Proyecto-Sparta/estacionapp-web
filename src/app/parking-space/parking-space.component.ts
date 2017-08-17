import {AfterViewInit, Component, ElementRef} from '@angular/core';
import * as interact from 'interactjs';

@Component({
  selector: 'parking-space',
  templateUrl: './parking-space.component.html',
  styleUrls: ['./parking-space.component.css']
})
export class ParkingSpaceComponent implements AfterViewInit {

  private angle = 0;
  private x = 0;
  private y = 0;
  private width;
  private height;
  private elementHTML : HTMLElement;

  constructor(private elemRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.setupDraggable(this);
    this.elementHTML = this.elemRef.nativeElement;
    this.height = this.elementHTML.getBoundingClientRect().height;
    this.width = this.elementHTML.getBoundingClientRect().width;
  }


  private setupDraggable(component) {
    interact('.parking-space').draggable({
      inertia: true,
      endOnly: false,
      restrict: {
        restriction: '.dropzone',
        elementRect: {top: 0, left: 0, bottom: 1, right: 1}
      },

      autoScroll: true,
      onmove: function(event){
        let target = event.target,

          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        target.style.webkitTransform =
          target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);

        component.x = -x;
        component.y = -y;
        component.width = component.elementHTML.getBoundingClientRect().width;
        component.height = component.elementHTML.getBoundingClientRect().height;

      }
    })
  }

}
