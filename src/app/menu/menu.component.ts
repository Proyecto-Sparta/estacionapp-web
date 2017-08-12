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
      path: '/home/occupancy'
    },
    {
      name: 'Edit Garage\'s Map',
      path: '/home/layout'
    },
    {
      name: 'Logout',
      path: '/logout'
    },
  ];
}
