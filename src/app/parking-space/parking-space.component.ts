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
    this.render();
  }

  private render() {
    const x = this.model.x.toString(),
      y = this.model.y.toString();

    this.elementHTML.setAttribute('data-x', x);
    this.elementHTML.setAttribute('data-y', y);
    this.elementHTML.style.transform = `translate(${x}px, ${y}px)`;
    this.elementHTML.style.width = `${this.model.width}px`;
    this.elementHTML.style.height = `${this.model.height}px`;
  }

  updatePosition(component) {
    const x = parseFloat(component.elemRef.nativeElement.children[0].getAttribute('data-x')) || 0;
    const y = parseFloat(component.elemRef.nativeElement.children[0].getAttribute('data-y')) || 0;

    console.log("updating position: "+x+", "+y);

    component.model.updatePosition(x, y);
  }
}
