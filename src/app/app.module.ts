import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Calendar } from '../pages/calendar/calendar';
import { ModalPage } from '../pages/modal/modal';
import { Notifications } from '../pages/notifications/notifications';
import { Settings } from '../pages/settings/settings';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


// import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyAp9YHR2heTGWLO6srLHgK-IOTdGc-Rg54",
  authDomain: "dsi-calendar-2f993.firebaseapp.com",
  databaseURL: "https://dsi-calendar-2f993.firebaseio.com",
  projectId: "dsi-calendar-2f993",
  storageBucket: "dsi-calendar-2f993.appspot.com",
  messagingSenderId: "692862172110"
};


@NgModule({
  declarations: [
    MyApp,
    Page1,
    Calendar,
    ModalPage,
    Notifications,
    Settings
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Calendar,
    ModalPage,
    Notifications,
    Settings
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
