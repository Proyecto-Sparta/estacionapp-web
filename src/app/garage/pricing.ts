export class Pricing {

  constructor(public bike : number = 0,
              public car: number = 0,
              public pickup: number = 0){

  }

  public mapToRequest(){
    return {
      bike : this.bike,
      car : this.car,
      pickup : this.pickup
    }
  }

}
