import {Component} from '@angular/core';
import {LoginService} from './login/login.service';
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService]
})
export class AppComponent {

  constructor(db: AngularFireDatabase) {
  }

}
