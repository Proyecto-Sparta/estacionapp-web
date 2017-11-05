import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {ParkingSpace} from '../parking-space/parking-space';
import {Floor} from '../floors/floor';
import {Point} from '../layout/point';
import {GarageLayout} from '../garage/garageLayout';

@Injectable()
export class GarageLayoutService {
  private apiUrl = 'http://localhost:4000/api/garage';

  constructor(private http: Http,
              private router: Router) {
  }

  public getGarageLayout(garageId: Number) {
    return new Promise((resolve, reject) =>
      resolve({
        shape: [
          {x: 10, y: 10},
          {x: 1080, y: 410},
          {x: 1080, y: 10}
        ],
        floors: [{
          floor_level: 0,
          parking_spaces: [
            {
              shape: 'square',
              x: 100,
              y: 50,
              width: 60,
              height: 60,
              angle: 0
            },
            {
              shape: 'square',
              x: 560,
              y: 60,
              width: 144,
              height: 144,
              angle: 0
            }
          ]
        },
        {
          floor_level: 1,
          parking_spaces: [
            {
              shape: 'square',
              x: 300,
              y: 420,
              width: 60,
              height: 60,
              angle: 0
            }
          ]
        }
      ]
    })
    ).then((persistedObject: Object) =>
      {return this.mapObjectToGarageLayout(persistedObject);}
    );
  }

  public storeGarageLayout(garageId: Number, garageLayout: GarageLayout) {
    console.log(garageLayout);
    const storableObject = this.mapGarageLayoutToObject(garageLayout);
    console.log(storableObject);
  }

  private mapObjectToGarageLayout(object: Object) {
    const shape = object['shape'].map((obj) => new Point(obj.x, obj.y));
    const floors = object['floors'].map((obj) => this.mapObjectToFloor(obj, this.mapObjectToParkingSpace));
    return new GarageLayout(shape, floors);
  }

  private mapGarageLayoutToObject(garageLayout: GarageLayout) {
      return {
        shape: garageLayout.shape.map((point: Point) => { return {
          x: point.x,
          y: point.y
        }}),
        floors: garageLayout.floors.map((floor) => this.mapFloorToStorableObject(floor, this.mapParkingSpaceToStorableObject))
      };
  }

  private mapObjectToFloor(object: Object, parkingSpacesMapper: Function) {
    const floorLevel = object['floor_level'],
      parkingSpaces = object['parking_spaces'];
    return new Floor(floorLevel, parkingSpaces.map(parkingSpacesMapper));
  }

  private mapFloorToStorableObject(floor: Floor, parkingSpaceMapper) {
    return {
      floor_level: floor.floorLevel,
      parkingSpaces: floor.parkingSpaces.map(parkingSpaceMapper)
    };
  }

  private mapObjectToParkingSpace(object: Object) {
    const shape = object['shape'],
      x = object['x'],
      y = object['y'],
      width = object['width'],
      height = object['height'],
      angle = object['angle'],
      occupied = object['occupied'];

    return new ParkingSpace(shape, x, y, width, height, angle, occupied);
  }

  private mapParkingSpaceToStorableObject(parkingSpace: ParkingSpace) {
    return {
      shape: parkingSpace.shape,
      x: parkingSpace.x,
      y: parkingSpace.y,
      width: parkingSpace.width,
      height: parkingSpace.height,
      angle: parkingSpace.angle,
      occupied: parkingSpace.occupied
    };
  }
}
