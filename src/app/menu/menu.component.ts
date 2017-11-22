import {Component} from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  links = [
    {
      name: 'Dashboard',
      path: '/myAccount/dashboard'
    },
    {
      name: 'View Occupancy',
      path: '/myAccount/occupancy'
    },
    {
      name: 'Edit Garage\'s Map',
      path: '/myAccount/layout'
    },
    {
      name: 'Settings',
      path: 'myAccount/settings'
    },
    {
      name: 'Help',
      path: 'myAccount/help'
    },
    {
      name: 'Logout',
      path: '/logout'
    },
  ];
}
