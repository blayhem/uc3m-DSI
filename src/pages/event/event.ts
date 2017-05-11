import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Schedule } from '../schedule/schedule';

/**
 * Generated class for the EventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class Event {

  event: {date: string, subject: any, any};
  dateText: string;
  roomChange: boolean = Math.floor(Math.random()*10 %2)===1;

  weekdays = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  date;
  // text: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event = this.navParams.get('event');
    
    let dates = this.event.date.split(' ').map(e => Number(e));
    this.date = new Date(dates[0], dates[1], dates[2], dates[3], dates[4]);
    let meses  = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    this.dateText  = this.date.getDate()+' de '+
                meses[this.date.getMonth()]+', '+
                (this.date.getHours().toString().length==1 ? '0'+this.date.getHours().toString() : this.date.getHours().toString())+':'+
                (this.date.getMinutes().toString().length==1 ? '0'+this.date.getMinutes().toString() : this.date.getMinutes().toString());

    // console.log(this.event, this.event.subject, this.weekdays[date.getDay()]);
    // this.text = JSON.stringify(this.event);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad EventPage');
  }

  gotoSubj(){
     this.navCtrl.setRoot(Schedule, {subject: this.event.subject, weekday: this.weekdays[this.date.getDay()]});
  }

}
