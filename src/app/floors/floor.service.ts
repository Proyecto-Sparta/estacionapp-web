import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {ParkingSpace} from '../parking-space/parking-space';
import {Floor} from '../floors/floor';

@Injectable()
export class FloorService {
  private apiUrl = 'http://localhost:4000/api/garage';

  constructor(private http: Http,
              private router: Router) {
  }

  public getFloorPlans(garageId: Number) {
    return new Promise((resolve, reject) =>
      resolve([
        {
          floor_level: 0,
          parking_spaces: [
            {
              shape: 'square',
              x: 100,
              y: 50,
              width: 60,
              height: 60,
              angle: 0,
              occupied: true
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
              angle: 0,
              occupied: true
            }
          ]
        }
      ])
    ).then((persistedObjects: Array<Object>) =>
      persistedObjects.map(object => this.mapStoredObjectToFloor(object, this.mapStoredObjectToParkingSpace))
    );
  }

  public storeFloorPlansForGarage(garageId: Number, floors: Array<Floor>) {
    console.log(floors);
    const storableObjects = floors.map(this.mapFloorToStorableObject);
    console.log(storableObjects);
  }

  private mapStoredObjectToFloor(object: Object, parkingSpacesMapper: Function) {
    const floorLevel = object['floor_level'],
      parkingSpaces = object['parking_spaces'];
    return new Floor(floorLevel, parkingSpaces.map(parkingSpacesMapper));
  }

  private mapFloorToStorableObject(floor: Floor) {
    return {
      floor_level: floor.floorLevel,
      parkingSpaces: floor.parkingSpaces.map(this.mapParkingSpaceToStorableObject)
    };
  }

  private mapStoredObjectToParkingSpace(object: Object) {
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
