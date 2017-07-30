import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./signup/signup.component";
import {MapComponent} from "./map/map.component";
import {AppRoutingModule} from "./app-routing.module";
import {GarageService} from "./garage.service";
import {AgmCoreModule} from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    MapComponent
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
  providers: [GarageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
