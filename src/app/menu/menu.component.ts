import {Component} from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  links = [
    {
      name: 'View Occupancy',
      path: '/myAccount/occupancy'
    },
    {
      name: 'Edit Garage\'s Map',
      path: '/myAccount/layout'
    },
    {
      name: 'Logout',
      path: '/logout'
    },
  ];
}
