import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {PendingDriver} from "./pending-driver";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PendingDriversService {

  private pendingDrivers : Observable<PendingDriver[]>;

  constructor(private db : AngularFireDatabase){
    this.pendingDrivers = db.list('garages/1').valueChanges();
  }

  public getDrivers(){
    return this.pendingDrivers;
  }

  public assign(parkingSpace : number, driver : PendingDriver){
    console.log(driver.name, parkingSpace);
    this.db.database.ref("drivers").orderByChild("name").equalTo(driver.name)
      .on("child_added", function(snapshot) {
        return snapshot.ref.update(
          { waiting: false,
                  parkingSpace: parkingSpace}
        );
    });
  }

  deny(id : string) {
    this.db.database.ref("garages/1").child(id).remove()
      .catch(response => console.error(response))
  }
}
