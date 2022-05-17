import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import {AppRoutingModule} from "./app-routing.module";
import { OAuthModule } from 'angular-oauth2-oidc';

import {environment} from "../environments/environment";
import {CoreModule} from "./core/core.module";
import {FeaturesModule} from "./features/features.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    OAuthModule.forRoot(),
    HttpClientModule,
    CoreModule,
    FeaturesModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.allowedDomains,
        disallowedRoutes: environment.disallowedDomains
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
