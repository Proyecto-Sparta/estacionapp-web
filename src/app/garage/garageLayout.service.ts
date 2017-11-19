import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import {ParkingSpace} from '../parking-space/parking-space';
import {Floor} from '../floors/floor';
import {Point} from '../layout/point';
import {GarageLayout} from '../garage/garageLayout';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {isNull} from "util";

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
      .then((persistedObject: Object) => {
        return this.mapObjectToGarageLayout(persistedObject);
      });
  }

  public storeGarageLayout(garageLayout: GarageLayout) {
    const storableObject = this.mapGarageLayoutToObject(garageLayout);
    const previousLayouts = this.previousLayoutLevels();
    this.updateOutline(storableObject);
    this.createLayouts(storableObject.floors);
    this.updateLayouts(storableObject.floors, previousLayouts);
  }

  private getLayouts() {
    return JSON.parse(localStorage.getItem('garage'))['layouts'];
  }

  private previousLayoutLevels(){
    return this.getLayouts().map(floor => floor.floor_level);
  }

  private createLayouts(newLayouts) {
    const existingLayouts = this.previousLayoutLevels();
    newLayouts.filter(floor => GarageLayoutService.hasToBeCreated(floor, existingLayouts))
      .forEach(floor => this.createLayout(floor));
  }

  private static hasToBeCreated(floor, existingLayouts) {
    return !existingLayouts.includes(floor.floor_level) && floor.parking_spaces.length > 0;
  }

  private createLayout(floor) {
    let garage = JSON.parse(localStorage.getItem('garage'));
    const options = new RequestOptions({headers: this.generateHeaders()});
    return this.http
      .post(`${this.apiUrl}`, floor
        , options)
      .map(response => response.json())
      .subscribe((resp) => {
      debugger;
        garage['layouts'].push(resp);
        localStorage.setItem('garage', JSON.stringify(garage));
      });
  }

  generateHeaders() {
    const headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
    headers.append('authorization', localStorage.getItem('token'));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  private updateLayouts(floors, previousLayouts) {
    floors.forEach(floor => {
      if (floor.parking_spaces.length > 0 && previousLayouts.includes(floor.floor_level))
        this.updateLayout(floor, this.getFloorId(floor));
    });
  }

  private getFloorId(floor) {
    return floor['floor_level'];
  }

  public updateLayout(layout, id) {
    let garage = JSON.parse(localStorage.getItem('garage'));
    layout['id'] = id;
    layout['parking_spaces'] = layout.parking_spaces
      .map(parkingSpace => this.mapParkingSpaceToStorableObject(parkingSpace));
    const options = new RequestOptions({headers: this.generateHeaders()});
    return this.http
      .patch(`${this.apiUrl + layout.id}`, layout, options)
      .map(response => {
        garage['layouts'][layout.floor_level - 1] = response.json();
        garage['layouts'][layout.floor_level - 1]['parking_spaces'].forEach(
          parkingSpace => parkingSpace['occupied'] = parkingSpace['occupied?']
        );
        localStorage.setItem('garage', JSON.stringify(garage));
      })
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

  public mapObjectToGarageLayout(garage: Object): GarageLayout {
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
    let storableFloor = {
      floor_level: floor.floorLevel,
      garage_id: JSON.parse(localStorage.getItem('garage')).id,
      id: floor.id,
      parking_spaces: floor.parkingSpaces.map(parkingSpaceMapper)
    };

    if (isNull(floor.id)) {
      delete storableFloor.id
    }

    return storableFloor;

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
    let storableParkingSpace = {
      shape: parkingSpace.shape,
      x: parkingSpace.x,
      y: parkingSpace.y,
      width: parkingSpace.width,
      height: parkingSpace.height,
      angle: parkingSpace.angle,
      id: parkingSpace.id,
      'occupied?': parkingSpace.occupied
    };

    if (isNull(parkingSpace.id)) {
      delete storableParkingSpace.id;
    }

    return storableParkingSpace;
  }

}
