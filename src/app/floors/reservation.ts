import {AssignedDriver} from "../driver/assigned-driver";

export class Reservation {
  constructor(public id : number, public driver : AssignedDriver, public parkingSpaceId : string){}


  public mapToRequest(){
    return {
      id : this.id,
      driver : this.driver.mapToRequest(),
      parking_space_id : this.parkingSpaceId
    }
  }
}
