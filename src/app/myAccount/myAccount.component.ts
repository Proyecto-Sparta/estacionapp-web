import {Component} from '@angular/core';
import {PendingDriversService} from '../pendingDrivers/pendingDrivers.service';
import {AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'myAccount',
  templateUrl: './myAccount.component.html',
  styleUrls: ['./myAccount.component.css'],
  providers: [PendingDriversService]
})

export class MyAccountComponent {

  pendingDrivers: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.pendingDrivers = db.collection('drivers').valueChanges();
  }

  public acceptDriver(driver){
    console.log("Accepted");
  }

  public denyDriver(driver){
    console.log("Denied");
  }
}
