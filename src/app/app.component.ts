import {Component} from '@angular/core';
import {LoginService} from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/dragula/dist/dragula.min.css'],
  providers: [LoginService]
})
export class AppComponent {


}
