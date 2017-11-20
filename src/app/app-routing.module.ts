import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from './signup/signup.component';
import {AuthGuard} from './guards/auth-guard.service';
import {HomeComponent} from './home/home.component';
import {MyAccountComponent} from './myAccount/myAccount.component';
import {LogoutComponent} from './logout/logout.component';
import {LayoutComponent} from './layout/layout.component';
import {ViewOccupancyComponent} from './viewOccupancy/viewOccupancy.component';
import {SettingsComponent} from "./settings/settings.component";
import {HelpComponent} from "./help/help.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/myAccount',
    pathMatch: 'full'
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'myAccount',
    component: MyAccountComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'layout',
        component: LayoutComponent
      },
      {
        path: 'occupancy',
        component: ViewOccupancyComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'help',
        component: HelpComponent
      }
    ]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
