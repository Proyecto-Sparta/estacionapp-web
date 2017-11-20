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
      resolve(this.getGarage()))
      .then((persistedObject: Object) => {
        return this.mapObjectToGarageLayout(persistedObject);
      });
  }

  public storeShape(garageLayout: GarageLayout) {
    const storableObject = this.mapGarageLayoutToObject(garageLayout);
    return this.updateOutline(storableObject);
  }


  private getLayouts() {
    return this.getGarage()['layouts'];
  }

  private getGarage() {
    return JSON.parse(localStorage.getItem('garage'));
  }

  private previousLayoutLevels() {
    return this.getLayouts().map(floor => floor.floor_level);
  }

  private floorAlreadyExists(floor: Floor) {
    return this.previousLayoutLevels().includes(floor.floorLevel);
  }

  private createFloor(floor: Floor) {
    const storableFloor = this.mapFloorToStorableObject(floor, this.mapParkingSpaceToStorableObject);
    let garage = this.getGarage();
    const options = new RequestOptions({headers: this.generateHeaders()});
    return this.http
      .post(`${this.apiUrl}`, storableFloor, options)
      .map(response => response.json())
      .subscribe((createdFloor) => {
        garage['layouts'][createdFloor.floor_level - 1] = createdFloor;
        localStorage.setItem('garage', JSON.stringify(garage));
      });
  }

  private deleteFloor(floor: Floor) {
    let garage = this.getGarage();
    const options = new RequestOptions({headers: this.generateHeaders()});
    return this.http
      .delete(`${this.apiUrl + floor.id}`, options)
      .subscribe(() => {
        delete garage['layouts'][floor.floorLevel - 1];
        localStorage.setItem('garage', JSON.stringify(garage));
      });
  }

  generateHeaders() {
    const headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
    headers.append('authorization', localStorage.getItem('token'));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  public updateFloor(floor: Floor) {
    let garage = this.getGarage();
    let layout = this.mapFloorToStorableObject(floor, this.mapParkingSpaceToStorableObject);
    const options = new RequestOptions({headers: this.generateHeaders()});
    return this.http
      .patch(`${this.apiUrl + layout.id}`, layout, options)
      .map(response => response.json())
      .subscribe((updatedLayout) => {
        garage['layouts'][floor.floorLevel - 1] = updatedLayout;
        garage['layouts'][floor.floorLevel - 1]['parking_spaces'].forEach(
          parkingSpace => parkingSpace['occupied'] = parkingSpace['occupied?']);
        localStorage.setItem('garage', JSON.stringify(garage));
      });
  }

  private updateOutline(storableObject) {
    const options = new RequestOptions({headers: this.generateHeaders()});
    return this.http
      .patch(`${this.garageApiUrl}`, {outline: storableObject.shape}, options)
      .map(response => response.json)
      .subscribe((storedGarage) => {
        let garage = this.getGarage();
        garage['outline'] = storedGarage['outline'];
        localStorage.setItem('garage', JSON.stringify(garage));
      });
  }

  public mapObjectToGarageLayout(garage: Object): GarageLayout {
    const shape = garage['outline'].map((obj) => new Point(obj.x, obj.y));
    const floors = garage['layouts'].map((obj) => this.mapObjectToFloor(obj, this.mapObjectToParkingSpace));
    return new GarageLayout(shape, floors);
  }

  public hasOutline() {
    return this.getGarage()['outline'].length > 0;
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

  public mapObjectToFloor(object: Object, parkingSpacesMapper: Function): Floor {
    const floorLevel = object['floor_level'],
      parkingSpaces = object['parking_spaces'],
      id = object['id'];
    return new Floor(floorLevel, id, parkingSpaces.map(parkingSpacesMapper));
  }

  private mapFloorToStorableObject(floor: Floor, parkingSpaceMapper) {
    let storableFloor = {
      floor_level: floor.floorLevel,
      garage_id: this.getGarage().id,
      id: floor.id,
      parking_spaces: floor.parkingSpaces.map(parkingSpaceMapper)
    };

    if (!floor.id) {
      delete storableFloor.id
    }

    return storableFloor;

  }

  public mapObjectToParkingSpace(object: Object) {
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


  upperFloorExists(floor: Floor) {
    return this.previousLayoutLevels().includes(floor.floorLevel + 1);
  }

  lowerFloorExists(floor: Floor) {
    return this.previousLayoutLevels().includes(floor.floorLevel - 1) ||
      floor.floorLevel === 1;
  }

  canBeStored(floor: Floor) {
    return this.lowerFloorExists(floor) && floor.hasParkingSpaces();
  }


  removeFloor(floor: Floor) {
    if (this.upperFloorExists(floor)) {
      alert(`Delete upper floor first!!`);
      return;
    }

    if (this.floorAlreadyExists(floor)) {
      alert(`Floor ${floor.floorLevel} deleted!`);
      this.deleteFloor(floor);
    }
  }

  storeFloor(floor: Floor) {
    if (this.canBeStored(floor)) {
      if (!this.floorAlreadyExists(floor)) {
        this.createFloor(floor);
        alert(`Floor ${floor.floorLevel} created!`);
      }
      else {
        this.updateFloor(floor);
        alert(`Floor ${floor.floorLevel} updated!`);
      }
    }
  }
}
