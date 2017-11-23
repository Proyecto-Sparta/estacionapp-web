import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import {Floor} from '../floors/floor';
import {GarageLayout} from './garageLayout';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {ConvertersService} from "./converters.service";
import { environment } from 'environments/environment';

@Injectable()
export class GarageLayoutService {
  private apiUrl = `${environment.backendURL}/api/layouts/`;
  private garageApiUrl = `${environment.backendURL}/api/garages/`;

  constructor(private http: Http,
              private router: Router, private converters : ConvertersService) {
  }

  public getGarageLayout() {
    return new Promise((resolve, reject) =>
      resolve(this.getGarage()))
      .then((persistedObject: Object) => {
        return this.converters.mapObjectToGarageLayout(persistedObject);
      });
  }

  public storeShape(garageLayout: GarageLayout) {
    const storableObject = this.converters.mapGarageLayoutToObject(garageLayout);
    return this.updateOutline(storableObject);
  }


  private getLayouts() {
    return this.getGarage()['layouts'];
  }

  public getGarage() {
    return JSON.parse(localStorage.getItem('garage'));
  }

  private previousLayoutLevels() {
    return this.getLayouts().map(floor => floor.floor_level);
  }

  private floorAlreadyExists(floor: Floor) {
    return this.previousLayoutLevels().includes(floor.floorLevel);
  }

  private createFloor(floor: Floor) {
    const storableFloor = this.converters
      .mapFloorToStorableObject(floor, this.converters.mapParkingSpaceToStorableObject, this.converters.mapReservationToStorableObject);
    let garage = this.getGarage();
    const options = new RequestOptions({headers: this.generateHeaders()});
    return this.http
      .post(`${this.apiUrl}`, storableFloor, options)
      .map(response => response.json())
      .subscribe((createdFloor) => {
        const floorObj = this.converters.mapObjectToFloor(createdFloor, 
          this.converters.mapObjectToParkingSpace,
          this.converters.mapObjectToReservation
        );
        floor.setId(createdFloor['id']);
        floor.setParkingSpaces(floorObj.parkingSpaces);
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
    let layout = this.converters.
    mapFloorToStorableObject(floor, this.converters.mapParkingSpaceToStorableObject, this.converters.mapReservationToStorableObject);
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
      .map(response => response.json())
      .subscribe(storedGarage => {
        let garage = this.getGarage();
        garage['outline'] = storedGarage['outline'];
        localStorage.setItem('garage', JSON.stringify(garage));
      });
  }

  public hasOutline() {
    return this.getGarage()['outline'].length > 0;
  }


  upperFloorExists(floor: Floor) {
    return this.previousLayoutLevels().includes(floor.floorLevel + 1);
  }

  hasUpperFloor(floorIndex : number){
    return this.previousLayoutLevels().includes(floorIndex + 2);
  }

  hasFloor(floorIndex : number){
    return this.previousLayoutLevels().includes(floorIndex + 1);
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

    return floor;
  }

  storeFloor(floor: Floor) {
    if (this.canBeStored(floor)) {
      if (!this.floorAlreadyExists(floor)) {
        this.createFloor(floor);
      }
      else {
        this.updateFloor(floor);
      }

    }
    return floor;
  }

}
