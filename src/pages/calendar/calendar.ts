import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

import {Http} from '@angular/http';
import { ModalController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';

import { Notifications } from '../notifications/notifications';
import { Login } from '../login/login';

@Component({
    selector: 'calendar',
    templateUrl: './calendar.html'
})
export class Calendar implements OnInit {

	data: Array<{name: string, date: string}>;
	events: Array<{name: string, date: string}>;
	free: boolean;
	date: string;
	today: number;

    // items: FirebaseListObservable<any[]>;
    items: FirebaseListObservable<any>;

    constructor(public af: AngularFire,
        private http: Http,
        public navCtrl: NavController, 
        public modalCtrl: ModalController
        ) {
    	/*this.http.get("./assets/events.json").subscribe(data => {
        	let json = JSON.parse(data['_body']);
            this.data = json.events ? json.events : [];
    	});*/

    	this.free = false;
    	this.today = new Date().getDate();
    }

    getData(date: number, data: Array<any>) {
    	this.events = data.filter(d => parseInt(d.date) == date);
    	if(this.events.length==0) this.free = true;
    	else this.free = false;

    	switch (date) {
    		case this.today:
    			this.date = "hoy";
    			break;
    		case this.today-1:
    			this.date = "ayer";
    			break;
    		case this.today+1:
    			this.date = "mañana";
    			break;
    		default:
    			this.date = "el día "+date;
    			break;
    	}
    }

    translateDate(ev, data){
    	// console.log(ev.detail.date);
    	this.getData(ev.detail.date.getDate(), data);
    }

    presentPopover(myEvent) {
        let popover = this.modalCtrl.create(Notifications);
        popover.present({
          ev: myEvent
        });
    }

    ngOnInit() {

        this.af.database.list('/events').subscribe(data => {
            // console.log(data)
            document
            .querySelector('.calendar')
            .addEventListener('date-change', (e) => {
                this.translateDate(e, data);
            })
            this.getData(new Date().getDate(), data);
            this.af.auth.subscribe((auth) => {
                if(!auth) this.navCtrl.setRoot(Login);
            });
        });
    }

    login() {
        this.af.auth.login();
    }
}