import {Injectable} from '@angular/core';
import {AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PendingDriversService {

  constructor(private db : AngularFirestore){}

  public assign(parkingSpace : number, driver : string){
    console.log(`Find driver ${driver} and assign parking space ${parkingSpace}`);
  }
}
