import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './signup/signup.component';
import {MapComponent} from './map/map.component';
import {MenuComponent} from './menu/menu.component';
import {AppRoutingModule} from './app-routing.module';
import {GarageService} from './garage/garage.service';
import {LoginService} from './login/login.service';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from './guards/auth-guard.service';
import {AgmCoreModule} from '@agm/core';
import {HomeComponent} from './home/home.component';
import {MyAccountComponent} from './myAccount/myAccount.component';
import {LogoutComponent} from './logout/logout.component';
import {LayoutComponent} from './layout/layout.component';
import {ParkingSpaceComponent} from './parking-space/parking-space.component';
import {ParkingItemComponent} from './parking-item/parking-item.component';
import {ViewOccupancyComponent} from './viewOccupancy/viewOccupancy.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    SignUpComponent,
    MapComponent,
    MenuComponent,
    DashboardComponent,
    HomeComponent,
    MyAccountComponent,
    LayoutComponent,
    ParkingSpaceComponent,
    ParkingItemComponent,
    ViewOccupancyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAAsIKJcL_6F6V0FzZif5pRSwu17vY_UAU'
    })
  ],
  providers: [GarageService, LoginService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
