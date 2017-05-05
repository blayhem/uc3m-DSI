import { Component, OnInit } from '@angular/core';
import {AngularFire} from 'angularfire2';
import { ModalController, NavController } from 'ionic-angular';

import { Notifications } from '../notifications/notifications';
import { Login } from '../login/login';
import { Event } from '../event/event';

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
    notificationList: Array<{any}> = [];

    constructor(public af: AngularFire,
        public navCtrl: NavController, 
        public modalCtrl: ModalController
        ) {

    	this.free = false;
        this.events = [];
    }

    presentModal(myEvent) {
        let modal = this.modalCtrl.create(Notifications, {notifications: this.notificationList});
        modal.present({
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

    showEvent(e){
        this.navCtrl.push(Event, {'event': e});
    }

    ngOnInit() {

        this.af.auth.subscribe((auth) => {
            if(!auth) this.navCtrl.setRoot(Login);
            else{
                if(auth.uid){
                    this.af.database.object('/users/'+auth.uid).subscribe(obj => {

                        this.notificationList = obj.notifications;
                        let data = obj.events;
                        let calendar = document.querySelector('.calendar')

                        if(calendar){
                            calendar
                            .addEventListener('date-change', (e:any) => {
                                this.getEventsByDate(e.detail.date, data);
                            });
                        }
                        
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
    }
}