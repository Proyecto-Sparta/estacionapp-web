import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {LoginComponent} from "./login/login.component";
import {AppRoutingModule} from "./app-routing.module";
import {GarageService} from "./garage/garage.service";
import {LoginService} from "./login/login.service";
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from "./guards/auth-guard.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [GarageService, LoginService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
