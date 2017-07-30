import {Component, Input} from "@angular/core";
import {mapListener} from "../interfaces/onMarkerLocationChanged"

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  @Input() listener: mapListener;

  zoom = 16
  defaultLat = -34.60372
  defaultLong = -58.381592
  marker: Marker = new Marker(this.defaultLat, this.defaultLong)

  onMapClick($event: MouseEvent){
    this.marker = new Marker($event['coords'].lat, $event['coords'].lng)
    this.listener.onMarkerLocationChanged(this.marker);
  }
}

export class Marker{
  lat: Number;
  long: Number;

  public constructor(lat:Number, long:Number){
    this. lat = lat;
    this.long = long;
  }
}
