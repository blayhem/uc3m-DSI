import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Calendar } from '../pages/calendar/calendar';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Calendar
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Calendar
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
