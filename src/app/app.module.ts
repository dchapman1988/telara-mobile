///<reference path="../../node_modules/@angular/core/src/di/metadata.d.ts"/>
import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, Injectable, Injector, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, Platform} from 'ionic-angular';

import {MyApp} from './app.component';
import {TabsPage} from '../pages/tabs/tabs';
import {ZoneEventPage} from '../pages/zone-events/zone-events';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {DefaultService} from "../swagger-telaradb";
import {HttpBackend, HttpClient, HttpClientModule, HttpXhrBackend} from "@angular/common/http";
import {ZoneEventService} from "../zoneevents/zone-event.service";
import {HTTP} from "@ionic-native/http";
import {NativeHttpBackend, NativeHttpFallback, NativeHttpModule} from "ionic-native-http-connection-backend";
import {PipesModule} from "../pipes/pipes.module";
import {Pro} from "@ionic/pro";
import {HomePage} from "../pages/home/home";
import {DatabasePage} from "../pages/database/database";

Pro.init('8f75b207', {
  appVersion: '0.0.1'
});

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ZoneEventPage,
    HomePage,
    DatabasePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NativeHttpModule,
    PipesModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ZoneEventPage,
    DatabasePage,
    HomePage
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
    IonicErrorHandler,
    [{ provide: ErrorHandler, useClass: MyErrorHandler }]
  ]
})
export class AppModule {
}
