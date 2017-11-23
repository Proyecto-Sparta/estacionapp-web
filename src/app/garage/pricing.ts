import {isNull} from "util";

export class Pricing {

  constructor(public bike : number = 0,
              public car: number = 0,
              public pickup: number = 0,
              public id : string = null){

  }

  public mapToRequest(){
    let request = {
      id : this.id,
      bike : this.bike,
      car : this.car,
      pickup : this.pickup
    };

    if(isNull(this.id))
      delete request.id;

    return request;

  }

}
