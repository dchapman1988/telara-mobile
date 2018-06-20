import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, Platform} from 'ionic-angular';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { ZoneEventPage } from '../pages/zone-events/zone-events';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DefaultService} from "../swagger-telaradb";
import {HttpBackend, HttpClient, HttpClientModule, HttpXhrBackend} from "@angular/common/http";
import {ZoneEventService} from "../zoneevents/zone-event.service";
import {HTTP} from "@ionic-native/http";
import {NativeHttpBackend, NativeHttpFallback, NativeHttpModule} from "ionic-native-http-connection-backend";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ZoneEventPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NativeHttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ZoneEventPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DefaultService,
    ZoneEventService,
    HTTP,
    {provide: HttpBackend, useClass: NativeHttpFallback, deps: [Platform, NativeHttpBackend, HttpXhrBackend]},

  ]
})
export class AppModule {}
