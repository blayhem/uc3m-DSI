import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { ModalController, NavController } from 'ionic-angular';

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
    items: FirebaseListObservable<any>;

    constructor(public af: AngularFire,
        public navCtrl: NavController, 
        public modalCtrl: ModalController
        ) {

    	this.free = false;
    	// this.today = new Date().getDate();
        this.events = [];
    }

    // PSEUDO-DEPRECATED
    getData(date: number, data: Array<any>) {
    	this.events = data.filter(d => parseInt(d.date) == date);
    	if(this.events.length==0) this.free = true;
    	else this.free = false;

    	/*switch (date) {
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
    	}*/
    }

    // DEPRECATED
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

    //TODO: get events by direct access (obj)
    getEventsByDate(date, data){
        this.events = [];
        //foreach event in DB data
        data.map(event => {
            let params = event.date.split(' ').map(p => Number(p));
            let dbDate = new Date(params[0], params[1], params[2], params[3], params[4]);
            if(date.getDate()===dbDate.getDate() && date.getMonth()===dbDate.getMonth() && date.getFullYear()===dbDate.getFullYear()){
                this.events.push(event);
            }
        });
        if(this.events.length==0) this.free = true;
        else this.free = false;
        let today = new Date().getDate();

        switch (date.getDate()) {
            case today:
                this.date = "hoy";
                break;
            case today-1:
                this.date = "ayer";
                break;
            case today+1:
                this.date = "mañana";
                break;
            default:
                this.date = "el día "+date.getDate();
                break;
        }
    }

    ngOnInit() {

        this.af.auth.subscribe((auth) => {
            if(!auth) this.navCtrl.setRoot(Login);
            else{
                if(auth.uid){
                    this.af.database.list('/users/'+auth.uid+'/events').subscribe(data => {

                        document
                        .querySelector('.calendar')
                        .addEventListener('date-change', (e:any) => {
                            this.getEventsByDate(e.detail.date, data);
                        });
                        //TODO: null when starting as log out

                        /*document
                        .querySelector('.calendar')
                        .addEventListener('month-change', (e:any) => {
                            this.buildData();
                        });*/

                        this.getEventsByDate(new Date(), data);
                    });
                }
            }
        });

        /*this.af.database.list('/events').subscribe(data => {
            // console.log("Data recovered from database.");
            document
            .querySelector('.calendar')
            .addEventListener('date-change', (e) => {
                this.translateDate(e, data);
            })
            this.getData(new Date().getDate(), data);
            this.af.auth.subscribe((auth) => {
                if(!auth) this.navCtrl.setRoot(Login);
            });
        });*/
    }
}