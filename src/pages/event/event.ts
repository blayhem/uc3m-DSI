import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  event: {'date': string, any};
  date: string;
  roomChange: boolean = Math.floor(Math.random()*10 %2)===1;
  // text: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event = this.navParams.get('event');
    let dates = this.event.date.split(' ').map(e => Number(e));
    let date   = new Date(dates[0], dates[1], dates[2], dates[3], dates[4]);
    let meses  = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    this.date  = date.getDate()+' de '+
                meses[date.getMonth()]+', '+
                (date.getHours().toString().length==1 ? '0'+date.getHours().toString() : date.getHours().toString())+':'+
                (date.getMinutes().toString().length==1 ? '0'+date.getMinutes().toString() : date.getMinutes().toString());
    // this.text = JSON.stringify(this.event);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }

}
