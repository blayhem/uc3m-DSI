import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Calendar } from '../pages/calendar/calendar';
import { ModalPage } from '../pages/modal/modal';
import { Notifications } from '../pages/notifications/notifications';
import { Settings } from '../pages/settings/settings';
import { Login } from '../pages/login/login';
import { Tutorial } from '../pages/tutorial/tutorial';
import { TutorialList} from '../pages/tutorial-list/tutorial-list';
import { TutorialRequest} from '../pages/tutorial-request/tutorial-request';
import { Schedule } from '../pages/schedule/schedule';
import { Event } from '../pages/event/event';
import { Filter } from '../pages/filter/filter';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

export const firebaseConfig = {
  // Deleted firebase project, keys no longer active.
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
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
    Filter,
    Login,
    ModalPage,
    Notifications,
    Settings,
    Schedule,
    Tutorial,
    TutorialList,
    TutorialRequest
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
    Filter,
    Login,
    ModalPage,
    Notifications,
    Settings,
    Schedule,
    Tutorial,
    TutorialList,
    TutorialRequest
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
