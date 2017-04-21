import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

export class Ajustes {
  id: number;
  name: string;
  subajustes: Array<{name: string, type: string, content: Array<any>}>;
}




@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class Settings {

  settings: Ajustes[] = [
	  { id: 1,  name: 'Ajustes generales', subajustes: [
		{name: "Primer día de la semana", type: "select", content: ["Lunes", "Domingo"]},
		{name: "Estado de las notificaciones", type: "toggle", content: ["Label"]}
	  ] },
	  { id: 2,  name: 'Ajustes de notificaciones', 	  subajustes: [] },
	  { id: 13, name: 'Ajustes de tema', subajustes: [] },
	  { id: 14, name: 'Fecha y hora',subajustes: [] },
	  { id: 15, name: 'Asistencia',  subajustes: [] }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}


