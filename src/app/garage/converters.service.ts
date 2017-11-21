import {Injectable} from "@angular/core";
import {isNull} from "util";
import {ParkingSpace} from "../parking-space/parking-space";
import {AssignedDriver} from "../driver/assigned-driver";
import {Reservation} from "../floors/reservation";
import {Vehicle} from "../vehicle/vehicle";
import {Floor} from "../floors/floor";
import {GarageLayout} from "./garageLayout";
import {Point} from "../layout/point";

@Injectable()
export class ConvertersService {

  public mapObjectToGarageLayout(garage: Object): GarageLayout {
    const shape = garage['outline'].map((obj) => new Point(obj.x, obj.y));
    const floors = garage['layouts'].map((obj) => this.mapObjectToFloor(obj, this.mapObjectToParkingSpace, this.mapObjectToReservation));
    return new GarageLayout(shape, floors);
  }


  public mapGarageLayoutToObject(garageLayout: GarageLayout) {
    return {
      shape: garageLayout.shape.map((point: Point) => {
        return {
          x: point.x,
          y: point.y
        }
      }),
      floors: garageLayout.floors.map((floor) =>
        this.mapFloorToStorableObject(floor, this.mapParkingSpaceToStorableObject, this.mapReservationToStorableObject))
    };
  }

  public mapObjectToFloor(object: Object, parkingSpacesMapper: Function, reservationsMapper: Function): Floor {
    const floorLevel = object['floor_level'],
      id = object['id'],
      parkingSpaces = object['parking_spaces'],
      reservations = object['reservations'];
    return new Floor(floorLevel, id, parkingSpaces.map(parkingSpacesMapper), reservations.map(reservationsMapper));
  }

  public mapFloorToStorableObject(floor: Floor, parkingSpaceMapper, reservationMapper) {
    let storableFloor = {
      floor_level: floor.floorLevel,
      garage_id: this.getGarage().id,
      id: floor.id,
      parking_spaces: floor.parkingSpaces.map(parkingSpaceMapper),
      reservations: floor.reservations.map(reservationMapper)
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

  public mapObjectToReservation(object: Object) {
    const id = object['id'],
      driver = object['driver'];
    return new Reservation(id, this.mapObjectToDriver(driver));
  }

  public mapObjectToDriver(object: Object): AssignedDriver {
    const fullName = object['full_name'],
      id = object['id'],
      email = object['email'],
      vehicle = new Vehicle(object['vehicle']['type'], object['vehicle']['plate']);
    return new AssignedDriver(id, email, fullName, vehicle);
  }

  public mapReservationToStorableObject(reservation: Reservation) {
    return {
      'id': reservation.id,
      'driver': this.mapDriverToObject(reservation.driver)
    }
  }

  public mapDriverToObject(driver: AssignedDriver) {
    return {
      'id': driver.id,
      'email': driver.email,
      'full_name': driver.fullName,
      'vehicle': {
        'type': driver.vehicle.type,
        'plate': driver.vehicle.plate
      }
    }
  }


  public mapParkingSpaceToStorableObject(parkingSpace: ParkingSpace) {
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


  private getGarage() {
    return JSON.parse(localStorage.getItem('garage'));
  }
}
