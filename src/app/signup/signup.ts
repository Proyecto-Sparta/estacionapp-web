import {Pricing} from "../garage/pricing";
import {Amenity} from "../garage/amenity";

export class SignupModel {

  constructor(
    public username: string = null,
    public name : string = null,
    public email: string = null,
    public password: string = null,
    public confirmPassword: string = null,
    public location = null,
    public pricing : Pricing = new Pricing(),
    public amenities : Array<AmenityCheckbox> = []){}

}


export class AmenityCheckbox {

  constructor(public amenity : Amenity, public checked : Boolean){}

}
