import {Component} from '@angular/core';
import {LoginService} from './login/login.service';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService]
})
export class AppComponent {

  constructor(db: AngularFirestore){}

}
