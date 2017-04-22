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
		{name: "Vista predeterminada", type: "select", content: ["Mensual", "Semanal"]},
		{name: "Formato", type: "select", content: ["Mes/Año", "Año/Mes"]},
		{name: "Idioma", type: "select", content: ["Español", "Inglés"]}
	  ] },
	  { id: 2,  name: 'Ajustes de notificaciones', 	  subajustes: [
		{name: "", type: "toggle", content: ["Estado de las notificaciones"]},
		{name: "Tono de notificación", type: "select", content: ["Tweeters", "Other"]},
		{name: "Vibración", type: "select", content: ["Predeterminada", "Suave", "Fuerte"]},
	  ] },
	  { id: 13, name: 'Ajustes de tema', subajustes: [
	  	{name: "Tema de la aplicación", type: "select", content: ["Claro", "Oscuro"]}
	  ] },
	  { id: 14, name: 'Fecha y hora',subajustes: [
	  	{name: "", type: "toggle", content: ["Fecha y hora automáticas"]},
	  	{name: "Zona horaria", type: "select", content: ["Europa Central GMT+2", "Other"]},
	  	{name: "Formato horario", type: "select", content: ["24h", "12h"]} 
	  ] },
	  { id: 15, name: 'Asistencia',  subajustes: [
	  	{name: "Enviar comentarios", type: "text", content: []},
	  	{name: "Versión de la aplicación", type: "text", content: ["2.9.3"]}
	  ] }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}


