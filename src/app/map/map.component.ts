import {Component} from "@angular/core";

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  zoom = 16
  defaultLat = -34.60372
  defaultLong = -58.381592
  marker = {
    lat: this.defaultLat,
    long: this.defaultLong
  }

  onMapClick($event: MouseEvent){
    this.marker = {
      lat: $event['coords'].lat,
      long: $event['coords'].lng
    }
  }

  getCoordinates(){
    return this.marker;
  }
}
