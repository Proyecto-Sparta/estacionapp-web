import {AfterViewInit, Component, ElementRef, Input} from '@angular/core';
import * as interact from 'interactjs';
import {ParkingSpace} from './parking-space';

@Component({
  selector: 'parking-space',
  templateUrl: './parking-space.component.html',
  styleUrls: ['./parking-space.component.css']
})
export class ParkingSpaceComponent implements AfterViewInit {

  private elementHTML: HTMLElement;

  @Input() model: ParkingSpace;
  constructor(private elemRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.elementHTML = this.elemRef.nativeElement.children[0];
    this.setupDraggable();
    this.initialize();
  }

  private initialize() {
    const x = this.model.x.toString(),
      y = this.model.y.toString();

    this.elementHTML.setAttribute('data-x', x);
    this.elementHTML.setAttribute('data-y', y);
    this.elementHTML.style.transform = `translate(${x}px, ${y}px)`;
  }

  private setupDraggable() {
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

  updatePosition(component) {
    const x = parseFloat(component.elemRef.nativeElement.children[0].getAttribute('data-x')) || 0;
    const y = parseFloat(component.elemRef.nativeElement.children[0].getAttribute('data-y')) || 0;

    component.model.updatePosition(x, y);
  }

}
