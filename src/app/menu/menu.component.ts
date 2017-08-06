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
      path: '/occupacy'
    },
    {
      name: 'Edit Garage\'s Map',
      path: '/edit-map'
    },
    {
      name: 'Logout',
      path: '/logout'
    },
  ];
}
