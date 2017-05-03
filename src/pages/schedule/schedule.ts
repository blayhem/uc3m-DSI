import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SchedulePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class Schedule {

	tabla = []

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.tabla = [
		{"period": "9-11",  "lunes": "AA",  "martes": "DPDS", "miercoles": "DSO", "jueves": "DSI", "viernes": "DSI"},
		{"period": "11-13", "lunes": "DSO", "martes": "PDL", "miercoles": "DPDS", "jueves": "AA",  "viernes": "PDL"}
		]
	}

	ionViewDidLoad() {
		//console.log('ionViewDidLoad SchedulePage');
	}

	debug(stuff){
		console.log(stuff);
	}

}
