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
      path: '/myAccount/occupancy'
    },
    {
      name: 'Editar el plano',
      path: '/myAccount/layout'
    },
    {
      name: 'Ajustes del perfil',
      path: 'myAccount/settings'
    },
    {
      name: 'Ayuda',
      path: 'myAccount/help'
    },
    {
      name: 'Cerrar sesión',
      path: '/logout'
    },
  ];
}
