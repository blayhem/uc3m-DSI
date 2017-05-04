import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Calendar } from '../pages/calendar/calendar';
import { ModalPage } from '../pages/modal/modal';
import { Notifications } from '../pages/notifications/notifications';
import { Settings } from '../pages/settings/settings';
import { Login } from '../pages/login/login';
import { Tutorial } from '../pages/tutorial/tutorial';
import { Schedule } from '../pages/schedule/schedule';
import { Event } from '../pages/event/event';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyAp9YHR2heTGWLO6srLHgK-IOTdGc-Rg54",
  authDomain: "dsi-calendar-2f993.firebaseapp.com",
  databaseURL: "https://dsi-calendar-2f993.firebaseio.com",
  projectId: "dsi-calendar-2f993",
  storageBucket: "dsi-calendar-2f993.appspot.com",
  messagingSenderId: "692862172110"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    MyApp,
    Calendar,
    Event,
    Login,
    ModalPage,
    Notifications,
    Page1,
    Settings,
    Schedule,
    Tutorial
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Calendar,
    Event,
    Login,
    ModalPage,
    Notifications,
    Page1,
    Settings,
    Schedule,
    Tutorial
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
