import {AfterViewInit, Component, ElementRef} from '@angular/core';
import * as interact from 'interactjs';
import {ParkingSpace} from "./parking-space";

@Component({
  selector: 'parking-space',
  templateUrl: './parking-space.component.html',
  styleUrls: ['./parking-space.component.css']
})
export class ParkingSpaceComponent implements AfterViewInit {


  private elementHTML : HTMLElement;
  model : ParkingSpace;
  private self : ParkingSpaceComponent;
  constructor(private elemRef: ElementRef) {
    this.self = this;
  }

  ngAfterViewInit(): void {
    this.elementHTML = this.elemRef.nativeElement;
    this.setupDraggable(this.self);
    this.initialize();
  }

  private initialize(){
    this.model = new ParkingSpace(this.relativeX(), this.relativeY(),
                    this.getHeight(), this.getWidth(), 0);
  }

  private getHeight(){
    return this.elementHTML.getBoundingClientRect().height;
  }

  private getWidth(){
    return this.elementHTML.getBoundingClientRect().width;
  }

  private relativeY(){
    return this.elementHTML.offsetTop - this.elementHTML.parentElement.offsetTop;
  }

  private relativeX(){
    return this.elementHTML.offsetLeft - this.elementHTML.parentElement.offsetLeft;
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

        component.model.updatePosition(x, y);

      }
    })
  }

  public updatePosition(){
    let x = parseFloat(this.elemRef.nativeElement.getAttribute('data-x')) || 0;
    let y = parseFloat(this.elemRef.nativeElement.getAttribute('data-y')) || 0;

    this.model.updatePosition(x, y);
  }

}
