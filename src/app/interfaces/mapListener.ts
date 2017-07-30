import {Marker} from '../map/map.component';

export interface mapListener{
  onMarkerLocationChanged(marker: Marker): void;
}
