import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {ParkingSpace} from '../parking-space/parking-space';

@Injectable()
export class ParkingSpaceService {
  private apiUrl = 'http://localhost:4000/api/garage';

  constructor(private http: Http,
              private router: Router) {
  }

  public getParkingSpacesForGarage(garageId: Number) {
    return new Promise((resolve, reject) =>
      resolve([
        {
          shape: 'square',
          x: 200,
          y: 120,
          width: 60,
          height: 60,
          angle: 0,
          occupied: true
        },
        {
          shape: 'square',
          x: 560,
          y: 40,
          width: 144,
          height: 144,
          angle: 0,
          occupied: false
        }
      ])
    ).then((persistedObjects: Array<Object>) =>
      persistedObjects.map(this.mapStoredObjectToParkingSpace)
    );
  }

  public storeParkingSpacesForGarage(garageId: Number, parkingSpaces: Array<ParkingSpace>) {
    console.log(parkingSpaces);
    const storableObjects = parkingSpaces.map(this.mapParkingSpaceToStorableObject);
    console.log(storableObjects);
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
