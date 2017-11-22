import {AmenityCheckbox} from "../signup/signup";
import {Pricing} from "../garage/pricing";

export class SettingsModel {

  constructor(public username : string,
              public name : string,
              public email : string,
              public pricing : Pricing,
              public amenities : Array<AmenityCheckbox>){}

}
