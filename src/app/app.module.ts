import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./signup/signup.component";
import {AppRoutingModule} from "./app-routing.module";
import {GarageService} from "./garage.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [GarageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
