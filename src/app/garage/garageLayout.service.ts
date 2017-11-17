import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import {ParkingSpace} from '../parking-space/parking-space';
import {Floor} from '../floors/floor';
import {Point} from '../layout/point';
import {GarageLayout} from '../garage/garageLayout';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GarageLayoutService {
  private apiUrl = 'http://localhost:4000/api/layouts/';
  private garageApiUrl = 'http://localhost:4000/api/garages/';

  constructor(private http: Http,
              private router: Router) {
  }

  public getGarageLayout() {
    return new Promise((resolve, reject) =>
      resolve(JSON.parse(localStorage.getItem('garage'))))
        .then((persistedObject: Object) =>
          {return this.mapObjectToGarageLayout(persistedObject);});
  }

  public storeGarageLayout(garageLayout: GarageLayout) {
    const storableObject = this.mapGarageLayoutToObject(garageLayout);
    console.log(storableObject);
    let garage = JSON.parse(localStorage.getItem('garage'));
    this.updateOutline(storableObject);
    this.createLayouts(storableObject.floors, garage['layouts']);
    this.updateLayouts(storableObject.floors);
  }

  private createLayouts(newLayouts, oldLayouts) {
    const existingLayouts = oldLayouts.map(floor => floor.floor_level);
    newLayouts.filter(floor => GarageLayoutService.hasToBeCreated(floor, existingLayouts))
      .forEach(floor => this.createLayout(floor));
  }

  private static hasToBeCreated(floor, existingLayouts){
    debugger;
    return !existingLayouts.includes(floor.floor_level) && floor.parking_spaces.length > 0;
  }

  private createLayout(floor) {
    let garage = JSON.parse(localStorage.getItem('garage'));
    const options = new RequestOptions({headers: this.generateHeaders()});
    return this.http
      .post(`${this.apiUrl}`, {
        floor
      }, options)
      .map(response => {
        garage['layouts'] = response.json;
      })
      .subscribe();
  }

  generateHeaders() {
    const headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
    headers.append('authorization', localStorage.getItem('token'));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  private updateLayouts(floors) {
    floors.forEach(floor => { if(floor.parking_spaces.length > 0) this.updateLayout(floor) });

        let garage = JSON.parse(localStorage.getItem('garage'));
        garage['layouts'] = floors;
        localStorage.setItem('garage', JSON.stringify(garage));
  }

  private updateLayout(layout){
    const options = new RequestOptions({headers: this.generateHeaders()});
    return this.http
      .patch(`${this.apiUrl + layout.id}`, layout, options)
      .map(response => response.json)
      .subscribe();
  }

  private updateOutline(storableObject) {
      let garage = JSON.parse(localStorage.getItem('garage'));
      garage['outline'] = storableObject.shape;
      localStorage.setItem('garage', JSON.stringify(garage));

      const options = new RequestOptions({headers: this.generateHeaders()});
      return this.http
        .patch(`${this.garageApiUrl}`, {outline: storableObject.shape}, options)
        .map(response => response.json)
        .subscribe();
  }

  private mapObjectToGarageLayout(garage: Object) {
    const shape = garage['outline'].map((obj) => new Point(obj.x, obj.y));
    const floors = garage['layouts'].map((obj) => this.mapObjectToFloor(obj, this.mapObjectToParkingSpace));
    return new GarageLayout(shape, floors);
  }

  private mapGarageLayoutToObject(garageLayout: GarageLayout) {
    return {
      shape: garageLayout.shape.map((point: Point) => {
        return {
          x: point.x,
          y: point.y
        }
      }),
      floors: garageLayout.floors.map((floor) => this.mapFloorToStorableObject(floor, this.mapParkingSpaceToStorableObject))
    };
  }

  private mapObjectToFloor(object: Object, parkingSpacesMapper: Function) {
    const floorLevel = object['floor_level'],
      parkingSpaces = object['parking_spaces'],
      id = object['id'];
    return new Floor(floorLevel, id, parkingSpaces.map(parkingSpacesMapper));
  }

  private mapFloorToStorableObject(floor: Floor, parkingSpaceMapper) {
    return {
      floor_level: floor.floorLevel,
      garage_id: JSON.parse(localStorage.getItem('garage')).id,
      id: floor.id,
      parking_spaces: floor.parkingSpaces.map(parkingSpaceMapper)
    };
  }

  private mapObjectToParkingSpace(object: Object) {
    const shape = object['shape'],
      x = object['x'],
      y = object['y'],
      id = object['id'],
      width = object['width'],
      height = object['height'],
      angle = object['angle'],
      occupied = object['occupied?'];

    return new ParkingSpace(shape, x, y, width, height, angle, id, occupied);
  }

  private mapParkingSpaceToStorableObject(parkingSpace: ParkingSpace) {
    return {
      shape: parkingSpace.shape,
      x: parkingSpace.x,
      y: parkingSpace.y,
      width: parkingSpace.width,
      height: parkingSpace.height,
      angle: parkingSpace.angle,
      id: parkingSpace.id,
      occupied: parkingSpace.occupied
    };
  }
}
