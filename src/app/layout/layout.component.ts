import {AfterViewInit, Component} from '@angular/core';
import * as interact from 'interactjs';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements AfterViewInit {
  private parkingSpaces;


  constructor() {
    this.parkingSpaces = Array(5);
  }

  ngAfterViewInit(): void {
    this.setupDropzone();
  }


  private setupDropzone(){
    interact('.dropzone').dropzone({
      accept: '.parking-space',
      overlap: 0.01,
      // add / remove dropzone feedback
      ondropactivate: function (event) {
        event.target.classList.add('drop-active');
      },
      ondropdeactivate: function (event) {
        event.target.classList.remove('drop-active');
      },

      // add / remove dropzone feedback
      ondragenter: function (event) {
        let draggableElement = event.relatedTarget,
          dropzoneElement = event.target;
        dropzoneElement.classList.add('drop-target');
        draggableElement.classList.add('can-drop');
      },
      ondragleave: function (event) {
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
      },

      // drop successful
      ondrop: function (event) {
        console.log(event);
      }
    });

  }


}
