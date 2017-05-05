import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';

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

	tabla = [];
	subject: any;
	subjects = [];
	displayDetails: boolean = false;

	constructor(public af: AngularFire,
		public navCtrl: NavController) {

		this.af.auth.subscribe((auth) => {
      		if(auth.uid){
	        	this.af.database.list('/users/'+auth.uid+'/subjects').subscribe(data => {
	        		//__init__
	        		this.subjects = data;
	        		this.buildSchedule();
	      		});
      		}
    	});
	}

	ionViewDidLoad() {
		//console.log('ionViewDidLoad SchedulePage');
	}

	buildSchedule(){
		let periods = {
			"9-11":  {"period": "9-11",   "lunes": " ",  "martes": " ", "miercoles": " ", "jueves": " ", "viernes": " "},
			"11-13": {"period": "11-13",  "lunes": " ",  "martes": " ", "miercoles": " ", "jueves": " ", "viernes": " "},
			"13-15": {"period": "13-15",  "lunes": " ",  "martes": " ", "miercoles": " ", "jueves": " ", "viernes": " "},
			"15-17": {"period": "15-17",  "lunes": " ",  "martes": " ", "miercoles": " ", "jueves": " ", "viernes": " "},
			"17-19": {"period": "17-19",  "lunes": " ",  "martes": " ", "miercoles": " ", "jueves": " ", "viernes": " "},
			"19-21": {"period": "19-21",  "lunes": " ",  "martes": " ", "miercoles": " ", "jueves": " ", "viernes": " "},
		};
		this.subjects.map(sub => {
			sub.schedule.map(s => {
				periods[s.period][s.day] = sub.key;
			});
		});
		for(let i in periods) {
    		let p = periods[i];
    		if(p.lunes !== ' ' || p.martes !== ' ' || p.miercoles !== ' ' || p.jueves!==' ' || p.viernes!==' '){
    			this.tabla.push(p);
    		}
		}
	}

	getDetails(subject, weekday){
		this.displayDetails = true;
		this.subject = this.subjects.filter(s => s.key===subject)[0];

		let selectedClass = this.subject.schedule.filter(s => s.day===weekday)[0];
		this.subject.room = selectedClass ? selectedClass.classroom : "Desconocida";
		this.subject.teacher = selectedClass ? selectedClass.teacher : "Desconocido";
	}

	debug(stuff){
		
	}

}
