import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';

import { Page1 } from '../pages/page1/page1';
import { Calendar } from '../pages/calendar/calendar'; 
import { Settings } from '../pages/settings/settings';
import { Login } from '../pages/login/login';

import {AngularFire} from 'angularfire2';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Calendar;

  pages: Array<{title: string, component: any}>;

  constructor(public af: AngularFire,
    public platform: Platform,
    public statusBar: StatusBar
    ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Calendario', component: Calendar },
      { title: 'Ver mi horario', component: Page1 },
      { title: 'Pedir tutoría', component: Page1 },
      { title: 'Filtrar eventos', component: Page1 },
      { title: 'Ajustes', component: Settings },
      {title: 'Cerrar Sesión', component: null}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.overlaysWebView(false);
      this.statusBar.styleDefault()
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title==='Cerrar Sesión'){
      this.af.auth.logout().then(() => this.rootPage=Login)
    }
    else{
      this.nav.setRoot(page.component);
    }
  }
}
